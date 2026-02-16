import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Member } from '@/types/gym';
import { Download, Printer } from 'lucide-react';

interface QRCodeDialogProps {
  member: Member | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRCodeDialog({ member, open, onOpenChange }: QRCodeDialogProps) {
  if (!member) return null;

  // Generate a simple QR code placeholder (in real app, use a QR library)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(member.barcodeId)}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center text-gradient">Member QR Code</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-6">
          <div className="p-4 bg-card rounded-xl border shadow-lg mb-4">
            <img 
              src={qrCodeUrl} 
              alt="Member QR Code" 
              className="w-48 h-48"
            />
          </div>
          
          <div className="text-center mb-4">
            <h3 className="font-semibold text-lg">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.id}</p>
            <p className="text-xs font-mono mt-2 px-3 py-1 bg-muted rounded">{member.barcodeId}</p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
