"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { QRCodeSVG } from "qrcode.react"
import { Shield, ShieldCheck, ShieldX, Copy, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TwoFactorAuthProps {
  isEnabled: boolean
  onToggle: (enabled: boolean, secret?: string) => void
}

export function TwoFactorAuth({ isEnabled, onToggle }: TwoFactorAuthProps) {
  const { toast } = useToast()
  const [step, setStep] = useState<"setup" | "verify" | "manage">(isEnabled ? "manage" : "setup")
  const [secret, setSecret] = useState("")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (step === "setup" && !isEnabled) {
      generateSecret()
    }
  }, [step, isEnabled])

  const generateSecret = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/2fa/setup", {
        method: "POST",
      })
      const data = await response.json()

      if (data.success) {
        setSecret(data.secret)
        setQrCodeUrl(data.qrCodeUrl)
        setBackupCodes(data.backupCodes)
      } else {
        toast({
          title: "Error",
          description: "Failed to generate 2FA secret",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to setup 2FA",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const verifyAndEnable = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a 6-digit verification code",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret,
          token: verificationCode,
        }),
      })

      const data = await response.json()

      if (data.success) {
        onToggle(true, secret)
        setStep("manage")
        toast({
          title: "2FA Enabled",
          description: "Two-factor authentication has been successfully enabled",
        })
      } else {
        toast({
          title: "Verification Failed",
          description: "Invalid verification code. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify 2FA code",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const disable2FA = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/2fa/disable", {
        method: "POST",
      })

      const data = await response.json()

      if (data.success) {
        onToggle(false)
        setStep("setup")
        setSecret("")
        setQrCodeUrl("")
        setBackupCodes([])
        toast({
          title: "2FA Disabled",
          description: "Two-factor authentication has been disabled",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to disable 2FA",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disable 2FA",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "Text copied to clipboard",
    })
  }

  const generateNewBackupCodes = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/2fa/backup-codes", {
        method: "POST",
      })

      const data = await response.json()

      if (data.success) {
        setBackupCodes(data.backupCodes)
        toast({
          title: "New Backup Codes Generated",
          description: "Your old backup codes are no longer valid",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to generate backup codes",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate backup codes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isEnabled ? (
            <ShieldCheck className="h-5 w-5 text-green-600" />
          ) : (
            <ShieldX className="h-5 w-5 text-gray-400" />
          )}
          Two-Factor Authentication
          <Badge variant={isEnabled ? "default" : "secondary"}>{isEnabled ? "Enabled" : "Disabled"}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === "setup" && (
          <>
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Two-factor authentication adds an extra layer of security to your account. You'll need an authenticator
                app like Google Authenticator or Authy.
              </AlertDescription>
            </Alert>

            {qrCodeUrl && (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Scan QR Code</h3>
                  <div className="inline-block p-4 bg-white border rounded-lg">
                    <QRCodeSVG value={qrCodeUrl} size={200} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Or enter this secret manually:</label>
                  <div className="flex gap-2">
                    <Input value={secret} readOnly className="font-mono text-sm" />
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(secret)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Enter verification code from your app:</label>
                  <Input
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="123456"
                    className="text-center text-lg tracking-widest"
                    maxLength={6}
                  />
                </div>

                <Button
                  onClick={verifyAndEnable}
                  disabled={isLoading || verificationCode.length !== 6}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Enable 2FA"
                  )}
                </Button>
              </div>
            )}
          </>
        )}

        {step === "manage" && isEnabled && (
          <div className="space-y-6">
            <Alert>
              <ShieldCheck className="h-4 w-4" />
              <AlertDescription>
                Two-factor authentication is currently enabled for your account. You'll be prompted for a verification
                code when logging in.
              </AlertDescription>
            </Alert>

            {backupCodes.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Backup Codes</h3>
                  <Button variant="outline" size="sm" onClick={generateNewBackupCodes} disabled={isLoading}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate New
                  </Button>
                </div>
                <Alert>
                  <AlertDescription>
                    Save these backup codes in a safe place. You can use them to access your account if you lose your
                    authenticator device.
                  </AlertDescription>
                </Alert>
                <div className="grid grid-cols-2 gap-2 p-4 bg-gray-50 rounded-lg font-mono text-sm">
                  {backupCodes.map((code, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                      <span>{code}</span>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(code)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t">
              <Button variant="destructive" onClick={disable2FA} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Disabling...
                  </>
                ) : (
                  "Disable 2FA"
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
