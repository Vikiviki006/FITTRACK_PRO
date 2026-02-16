import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { QrCode, Search, CheckCircle, XCircle, Camera } from 'lucide-react';
import { mockMembers } from '@/data/mockData';
import { Member } from '@/types/gym';

export function QRScanner() {
  const [manualCode, setManualCode] = useState('');
  const [scannedMember, setScannedMember] = useState<Member | null>(null);
  const [scanStatus, setScanStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isScanning, setIsScanning] = useState(false);

  const handleManualSearch = () => {
    const member = mockMembers.find(m => 
      m.barcodeId.toLowerCase() === manualCode.toLowerCase() ||
      m.id.toLowerCase() === manualCode.toLowerCase()
    );
    
    if (member) {
      setScannedMember(member);
      setScanStatus('success');
    } else {
      setScannedMember(null);
      setScanStatus('error');
    }
  };

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const randomMember = mockMembers[Math.floor(Math.random() * mockMembers.length)];
      setScannedMember(randomMember);
      setScanStatus('success');
      setIsScanning(false);
    }, 1500);
  };

  const handleCheckIn = () => {
    // In real app, this would record attendance
    setScanStatus('idle');
    setScannedMember(null);
    setManualCode('');
  };

  const daysLeft = scannedMember 
    ? Math.max(0, Math.ceil((new Date(scannedMember.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;
  const isExpired = daysLeft === 0;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Scanner Section */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            QR Code Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Camera Preview Area */}
          <div 
            className="aspect-square rounded-xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center bg-muted/30 cursor-pointer hover:border-primary/50 transition-colors"
            onClick={simulateScan}
          >
            {isScanning ? (
              <div className="text-center animate-pulse">
                <div className="h-16 w-16 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center animate-pulse-glow">
                  <QrCode className="h-8 w-8 text-primary-foreground" />
                </div>
                <p className="text-muted-foreground">Scanning...</p>
              </div>
            ) : (
              <div className="text-center">
                <Camera className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">Click to simulate scan</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Or use manual entry below</p>
              </div>
            )}
          </div>

          {/* Manual Entry */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Manual Entry</p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter Member ID or Barcode"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleManualSearch()}
              />
              <Button onClick={handleManualSearch} className="gradient-primary">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Result Section */}
      <Card className={`card-hover ${scanStatus === 'success' ? 'border-success/50' : scanStatus === 'error' ? 'border-destructive/50' : ''}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {scanStatus === 'success' ? (
              <CheckCircle className="h-5 w-5 text-success" />
            ) : scanStatus === 'error' ? (
              <XCircle className="h-5 w-5 text-destructive" />
            ) : null}
            Scan Result
          </CardTitle>
        </CardHeader>
        <CardContent>
          {scanStatus === 'idle' && (
            <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
              <QrCode className="h-16 w-16 mb-4 opacity-30" />
              <p>Scan a QR code or enter member ID</p>
            </div>
          )}

          {scanStatus === 'error' && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="h-16 w-16 rounded-full bg-destructive/20 flex items-center justify-center mb-4">
                <XCircle className="h-8 w-8 text-destructive" />
              </div>
              <p className="font-semibold text-destructive">Member Not Found</p>
              <p className="text-sm text-muted-foreground mt-1">Please check the ID and try again</p>
            </div>
          )}

          {scanStatus === 'success' && scannedMember && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="gradient-primary text-primary-foreground text-xl">
                    {scannedMember.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{scannedMember.name}</h3>
                  <p className="text-sm text-muted-foreground">{scannedMember.id}</p>
                  <Badge 
                    variant={scannedMember.paid ? 'default' : 'destructive'}
                    className={`mt-1 ${scannedMember.paid ? 'gradient-success border-0' : ''}`}
                  >
                    {scannedMember.paid ? 'Paid' : 'Payment Pending'}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <p className="text-xs text-muted-foreground">Membership</p>
                  <p className="font-semibold capitalize">{scannedMember.membershipType}</p>
                </div>
                <div className={`p-4 rounded-lg text-center ${isExpired ? 'bg-destructive/20' : 'bg-success/20'}`}>
                  <p className="text-xs text-muted-foreground">Days Left</p>
                  <p className={`font-bold text-xl ${isExpired ? 'text-destructive' : 'text-success'}`}>
                    {isExpired ? 'Expired' : daysLeft}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Start Date</span>
                  <span>{scannedMember.startDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">End Date</span>
                  <span className={isExpired ? 'text-destructive font-semibold' : ''}>{scannedMember.endDate}</span>
                </div>
              </div>

              {!isExpired ? (
                <Button className="w-full gradient-success" size="lg" onClick={handleCheckIn}>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Record Check-In
                </Button>
              ) : (
                <Button className="w-full" variant="destructive" size="lg">
                  <XCircle className="h-5 w-5 mr-2" />
                  Membership Expired - Renew
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
