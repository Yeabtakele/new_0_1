import { Pool } from "pg"

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Database types
export interface Booking {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  country?: string
  tour_type: string
  group_size: number
  selected_date: string
  time_slot: string
  special_requests?: string
  language?: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  created_at: string
  updated_at: string
}

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  service: string
  message: string
  status: "new" | "responded" | "closed"
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  featured_image?: string
  published: boolean
  version: number
  created_at: string
  updated_at: string
}

export interface BlogPostVersion {
  id: string
  post_id: string
  version: number
  title: string
  content: string
  excerpt: string
  author: string
  created_at: string
  change_summary?: string
}

export interface AdminUser {
  id: string
  username: string
  email: string
  password_hash: string
  two_factor_secret?: string
  two_factor_enabled: boolean
  last_login?: string
  created_at: string
}

// Database functions
export async function createBooking(bookingData: Omit<Booking, "id" | "created_at" | "updated_at">) {
  const client = await pool.connect()
  try {
    const result = await client.query(
      `INSERT INTO bookings (
        first_name, last_name, email, phone, country, tour_type, 
        group_size, selected_date, time_slot, special_requests, language, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
      RETURNING *`,
      [
        bookingData.first_name,
        bookingData.last_name,
        bookingData.email,
        bookingData.phone,
        bookingData.country,
        bookingData.tour_type,
        bookingData.group_size,
        bookingData.selected_date,
        bookingData.time_slot,
        bookingData.special_requests,
        bookingData.language,
        bookingData.status || "pending",
      ],
    )
    return result.rows[0]
  } finally {
    client.release()
  }
}

export async function getBookings(status?: string) {
  const client = await pool.connect()
  try {
    let query = "SELECT * FROM bookings ORDER BY created_at DESC"
    let params: any[] = []

    if (status && status !== "all") {
      query = "SELECT * FROM bookings WHERE status = $1 ORDER BY created_at DESC"
      params = [status]
    }

    const result = await client.query(query, params)
    return result.rows
  } finally {
    client.release()
  }
}

export async function updateBookingStatus(id: string, status: string) {
  const client = await pool.connect()
  try {
    const result = await client.query("UPDATE bookings SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *", [
      status,
      id,
    ])
    return result.rows[0]
  } finally {
    client.release()
  }
}

export async function createContact(contactData: Omit<Contact, "id" | "created_at">) {
  const client = await pool.connect()
  try {
    const result = await client.query(
      `INSERT INTO contacts (name, email, phone, service, message, status) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        contactData.name,
        contactData.email,
        contactData.phone,
        contactData.service,
        contactData.message,
        contactData.status || "new",
      ],
    )
    return result.rows[0]
  } finally {
    client.release()
  }
}

export async function getBlogPosts(published = true) {
  const client = await pool.connect()
  try {
    const result = await client.query("SELECT * FROM blog_posts WHERE published = $1 ORDER BY created_at DESC", [
      published,
    ])
    return result.rows
  } finally {
    client.release()
  }
}

export async function getBlogPost(slug: string) {
  const client = await pool.connect()
  try {
    const result = await client.query("SELECT * FROM blog_posts WHERE slug = $1 AND published = true", [slug])
    return result.rows[0]
  } finally {
    client.release()
  }
}

export async function createBlogPost(postData: Omit<BlogPost, "id" | "created_at" | "updated_at" | "version">) {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    // Create the blog post
    const postResult = await client.query(
      `INSERT INTO blog_posts (
        title, slug, excerpt, content, author, category, tags, 
        featured_image, published, version
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 1) RETURNING *`,
      [
        postData.title,
        postData.slug,
        postData.excerpt,
        postData.content,
        postData.author,
        postData.category,
        postData.tags,
        postData.featured_image,
        postData.published,
      ],
    )

    const post = postResult.rows[0]

    // Create version history entry
    await client.query(
      `INSERT INTO blog_post_versions (
        post_id, version, title, content, excerpt, author, change_summary
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [post.id, 1, post.title, post.content, post.excerpt, post.author, "Initial version"],
    )

    await client.query("COMMIT")
    return post
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}

export async function updateBlogPost(
  id: string,
  postData: Partial<BlogPost>,
  changeSummary?: string,
): Promise<BlogPost> {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    // Get current post for version history
    const currentPost = await client.query("SELECT * FROM blog_posts WHERE id = $1", [id])
    if (currentPost.rows.length === 0) {
      throw new Error("Post not found")
    }

    const current = currentPost.rows[0]
    const newVersion = current.version + 1

    // Update the post
    const updateFields = []
    const updateValues = []
    let paramIndex = 1

    Object.entries(postData).forEach(([key, value]) => {
      if (value !== undefined && key !== "id" && key !== "created_at") {
        updateFields.push(`${key} = $${paramIndex}`)
        updateValues.push(value)
        paramIndex++
      }
    })

    updateFields.push(`version = $${paramIndex}`, `updated_at = NOW()`)
    updateValues.push(newVersion, id)

    const updateQuery = `UPDATE blog_posts SET ${updateFields.join(", ")} WHERE id = $${paramIndex + 1} RETURNING *`
    const updatedPost = await client.query(updateQuery, updateValues)

    // Create version history entry
    await client.query(
      `INSERT INTO blog_post_versions (
        post_id, version, title, content, excerpt, author, change_summary
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        id,
        newVersion,
        postData.title || current.title,
        postData.content || current.content,
        postData.excerpt || current.excerpt,
        postData.author || current.author,
        changeSummary || "Updated post",
      ],
    )

    await client.query("COMMIT")
    return updatedPost.rows[0]
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}

export async function getBlogPostVersions(postId: string): Promise<BlogPostVersion[]> {
  const client = await pool.connect()
  try {
    const result = await client.query("SELECT * FROM blog_post_versions WHERE post_id = $1 ORDER BY version DESC", [
      postId,
    ])
    return result.rows
  } finally {
    client.release()
  }
}

export async function restoreBlogPostVersion(postId: string, version: number): Promise<BlogPost> {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    // Get the version to restore
    const versionResult = await client.query("SELECT * FROM blog_post_versions WHERE post_id = $1 AND version = $2", [
      postId,
      version,
    ])

    if (versionResult.rows.length === 0) {
      throw new Error("Version not found")
    }

    const versionData = versionResult.rows[0]

    // Update the current post with version data
    const updatedPost = await updateBlogPost(
      postId,
      {
        title: versionData.title,
        content: versionData.content,
        excerpt: versionData.excerpt,
      },
      `Restored to version ${version}`,
    )

    await client.query("COMMIT")
    return updatedPost
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}

export async function getAdminUser(username: string): Promise<AdminUser | null> {
  const client = await pool.connect()
  try {
    const result = await client.query("SELECT * FROM admin_users WHERE username = $1", [username])
    return result.rows[0] || null
  } finally {
    client.release()
  }
}

export async function updateAdminUser(id: string, userData: Partial<AdminUser>): Promise<AdminUser> {
  const client = await pool.connect()
  try {
    const updateFields = []
    const updateValues = []
    let paramIndex = 1

    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined && key !== "id" && key !== "created_at") {
        updateFields.push(`${key} = $${paramIndex}`)
        updateValues.push(value)
        paramIndex++
      }
    })

    updateValues.push(id)
    const updateQuery = `UPDATE admin_users SET ${updateFields.join(", ")} WHERE id = $${paramIndex} RETURNING *`
    const result = await client.query(updateQuery, updateValues)

    return result.rows[0]
  } finally {
    client.release()
  }
}

// Initialize database tables
export async function initializeDatabase() {
  const client = await pool.connect()
  try {
    // Create bookings table
    await client.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        country VARCHAR(100),
        tour_type VARCHAR(100) NOT NULL,
        group_size INTEGER NOT NULL,
        selected_date DATE NOT NULL,
        time_slot VARCHAR(100) NOT NULL,
        special_requests TEXT,
        language VARCHAR(50),
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

    // Create contacts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(200) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        service VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)

    // Create blog_posts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        author VARCHAR(100) NOT NULL,
        category VARCHAR(100) NOT NULL,
        tags TEXT[] DEFAULT '{}',
        featured_image VARCHAR(500),
        published BOOLEAN DEFAULT false,
        version INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

    // Create blog_post_versions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS blog_post_versions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
        version INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        author VARCHAR(100) NOT NULL,
        change_summary TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(post_id, version)
      )
    `)

    // Create admin_users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        two_factor_secret VARCHAR(32),
        two_factor_enabled BOOLEAN DEFAULT false,
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)

    // Insert default admin user (password: admin123)
    await client.query(`
      INSERT INTO admin_users (username, email, password_hash)
      VALUES ('admin', 'admin@eyobsalemot.com', '$2b$10$rQZ9QmjytWIeVA5cR6B8/.vQZGWQE8yF8yF8yF8yF8yF8yF8yF8yF')
      ON CONFLICT (username) DO NOTHING
    `)

    // Insert sample blog posts
    await client.query(`
      INSERT INTO blog_posts (title, slug, excerpt, content, author, category, tags, published, version)
      VALUES 
      (
        'Discovering Ethiopia''s Hidden Gems: A Guide to Addis Ababa''s Historical Sites',
        'discovering-ethiopia-hidden-gems',
        'Explore the rich history and cultural heritage of Ethiopia through Addis Ababa''s most significant historical landmarks.',
        'Ethiopia, often called the "Cradle of Humanity," is home to some of the world''s most fascinating historical sites. In this comprehensive guide, we''ll explore the must-visit historical landmarks in Addis Ababa that showcase the country''s rich imperial heritage and cultural significance.

## The Grand Palace (Menelik Palace)

The Grand Palace, also known as Menelik Palace, stands as a testament to Ethiopia''s imperial history. Built during the reign of Emperor Menelik II, this magnificent structure offers visitors a glimpse into the royal lifestyle of Ethiopian emperors.

### What to Expect:
- **Imperial Throne Room**: See the ornate throne where Ethiopian emperors held court
- **Royal Chambers**: Explore the private quarters of the imperial family
- **Historical Artifacts**: View collections of royal regalia and ceremonial items
- **Palace Gardens**: Stroll through beautifully maintained courtyards

## Adwa Victory Museum

The Adwa Victory Museum commemorates one of Africa''s most significant military victories. The Battle of Adwa in 1896 saw Ethiopian forces defeat Italian colonial forces, making Ethiopia one of the few African nations to successfully resist European colonization.

### Museum Highlights:
- Interactive exhibits detailing the battle strategy
- Artifacts from Emperor Menelik II''s era
- Traditional weapons and military displays
- Educational programs about Ethiopian independence

## Planning Your Visit

**Best Time to Visit**: Early morning (9 AM - 12 PM) for cooler temperatures and better lighting for photography.

**Duration**: Allow 4-6 hours for a comprehensive tour of both sites.

**What to Bring**: 
- Comfortable walking shoes
- Camera (photography permitted in most areas)
- Light jacket for air-conditioned spaces
- Respect for local customs at religious sites

## Cultural Etiquette

When visiting these historical sites, it''s important to:
- Dress modestly and respectfully
- Follow photography guidelines
- Listen to your guide''s instructions
- Show respect at religious or ceremonial areas

## Conclusion

Addis Ababa''s historical sites offer an unparalleled window into Ethiopia''s rich past. From imperial palaces to victory monuments, these landmarks tell the story of a nation that has maintained its independence and cultural identity throughout centuries of change.

Book your guided tour today to experience these incredible sites with expert commentary and cultural insights.',
        'Eyob Salemot',
        'Tourism',
        ARRAY['Ethiopia', 'Tourism', 'History', 'Addis Ababa', 'Culture'],
        true,
        1
      ),
      (
        'The Art of Ethiopian Coffee: From Bean to Cup',
        'art-of-ethiopian-coffee',
        'Discover the birthplace of coffee and learn about Ethiopia''s rich coffee culture and traditional brewing ceremonies.',
        'Ethiopia is widely recognized as the birthplace of coffee, and the country''s coffee culture runs deep through every aspect of daily life. Join us on a journey through Ethiopia''s coffee heritage, from the highland farms to the traditional coffee ceremony.

## The Origin Story

Legend tells us that coffee was first discovered by a goat herder named Kaldi in the Ethiopian highlands. Whether myth or reality, Ethiopia''s relationship with coffee spans over a thousand years, making it an integral part of the country''s cultural identity.

## Ethiopian Coffee Regions

### Sidamo
Known for its wine-like acidity and floral notes, Sidamo coffee is grown at high altitudes in southern Ethiopia.

### Yirgacheffe
Perhaps the most famous Ethiopian coffee, Yirgacheffe is prized for its bright, clean taste and distinctive floral aroma.

### Harrar
From the eastern highlands, Harrar coffee is known for its bold, wine-like flavor and fruity undertones.

## The Traditional Coffee Ceremony

The Ethiopian coffee ceremony is a social ritual that brings communities together. The process involves:

1. **Washing**: Green coffee beans are washed and sorted
2. **Roasting**: Beans are roasted over an open flame
3. **Grinding**: Freshly roasted beans are ground by hand
4. **Brewing**: Coffee is brewed in a traditional clay pot called a "jebena"
5. **Serving**: Coffee is served in small cups with great ceremony

## Coffee Culture Today

Modern Ethiopian coffee culture blends traditional practices with contemporary café experiences. In Addis Ababa, you''ll find everything from traditional coffee houses to modern specialty coffee shops.

## Experience Ethiopian Coffee

When visiting Ethiopia, don''t miss the opportunity to:
- Participate in a traditional coffee ceremony
- Visit local coffee farms
- Taste different regional varieties
- Learn about sustainable farming practices

## Conclusion

Ethiopian coffee is more than just a beverage—it''s a cultural experience that connects people, preserves traditions, and celebrates the country''s agricultural heritage. Whether you''re a coffee enthusiast or cultural explorer, Ethiopia''s coffee culture offers something truly special.',
        'Eyob Salemot',
        'Culture',
        ARRAY['Coffee', 'Ethiopia', 'Culture', 'Tradition', 'Agriculture'],
        true,
        1
      ),
      (
        'Community Development in Ethiopia: Building Sustainable Futures',
        'community-development-ethiopia',
        'Learn about grassroots community development initiatives that are transforming lives across Ethiopia.',
        'Community development in Ethiopia represents hope, resilience, and the power of collective action. Through grassroots initiatives and sustainable programs, communities across the country are building brighter futures for their children and generations to come.

## The Challenge

Ethiopia faces numerous development challenges, including:
- Limited access to education in rural areas
- Food security concerns
- Infrastructure gaps
- Youth unemployment
- Healthcare accessibility

## Grassroots Solutions

### Education Initiatives

**Student Meal Programs**: Providing nutritious meals to students ensures they can focus on learning rather than hunger. These programs have shown remarkable success in improving school attendance and academic performance.

**Adult Literacy Programs**: Teaching reading and writing skills to adults, particularly women, empowers entire families and communities.

### Economic Empowerment

**Microenterprise Support**: Small business training and microloans help families achieve economic independence.

**Skills Training**: Vocational programs in areas like tailoring, carpentry, and technology provide sustainable income opportunities.

### Infrastructure Development

**Water Access Projects**: Clean water initiatives reduce disease and free up time for education and economic activities.

**Sanitation Programs**: Building latrines and promoting hygiene education improves community health outcomes.

## Success Stories

### The Better Generation Project

Since 2015, the Better Generation project has:
- Provided meals to over 300 students
- Secured employment for 50+ parents
- Built sanitation facilities for 25 households
- Trained 100+ community members in various skills

### Youth Anti-Drug Programs

Prevention programs have reached:
- 300+ students across 6 schools
- Reduced substance abuse rates in target communities
- Created peer education networks
- Developed life skills curricula

## The Ripple Effect

Community development creates positive ripple effects:
- **Educated children** become community leaders
- **Employed parents** invest in their families
- **Improved infrastructure** attracts further investment
- **Healthy communities** are more productive

## How You Can Help

### Volunteer Opportunities
- Teaching and tutoring
- Skills training workshops
- Infrastructure projects
- Health education programs

### Financial Support
- Sponsor a student''s education
- Fund a family''s microenterprise
- Support infrastructure projects
- Contribute to emergency relief

### Advocacy
- Raise awareness about Ethiopian development needs
- Support fair trade Ethiopian products
- Advocate for international development funding

## Sustainable Development Goals

Our community work aligns with the UN Sustainable Development Goals:
1. No Poverty
2. Zero Hunger
3. Quality Education
4. Clean Water and Sanitation
5. Decent Work and Economic Growth

## Looking Forward

The future of Ethiopian community development lies in:
- **Local ownership** of development initiatives
- **Sustainable practices** that protect the environment
- **Technology integration** for education and communication
- **Youth leadership** development
- **Women''s empowerment** programs

## Conclusion

Community development in Ethiopia is about more than addressing immediate needs—it''s about building the foundation for a prosperous, equitable future. Every contribution, whether time, resources, or expertise, makes a meaningful difference in the lives of Ethiopian families and communities.

Together, we can continue building sustainable futures that honor Ethiopia''s rich heritage while embracing opportunities for growth and development.',
        'Eyob Salemot',
        'Community',
        ARRAY['Community Development', 'Ethiopia', 'Education', 'Sustainability', 'Social Impact'],
        true,
        1
      )
      ON CONFLICT (slug) DO NOTHING
    `)

    // Insert version history for sample posts
    await client.query(`
      INSERT INTO blog_post_versions (post_id, version, title, content, excerpt, author, change_summary)
      SELECT id, 1, title, content, excerpt, author, 'Initial version'
      FROM blog_posts
      WHERE slug IN ('discovering-ethiopia-hidden-gems', 'art-of-ethiopian-coffee', 'community-development-ethiopia')
      ON CONFLICT (post_id, version) DO NOTHING
    `)

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Database initialization error:", error)
    throw error
  } finally {
    client.release()
  }
}
