import { QRScanner } from '@/components/scanner/QRScanner';

export default function Scanner() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gradient">QR Scanner</h1>
        <p className="text-muted-foreground">Scan member QR codes for quick check-in</p>
      </div>

      <QRScanner />
    </div>
  );
}
