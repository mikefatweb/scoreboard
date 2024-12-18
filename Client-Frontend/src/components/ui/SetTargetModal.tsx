import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface SetTargetModalProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (targetAmount: number, endDate: string) => void; // Keep the name as targetAmount
  initialTarget: number;
  sellerName: string;
}

const SetTargetModal: React.FC<SetTargetModalProps> = ({
  open,
  onClose,
  onUpdate,
  initialTarget,
  sellerName,
}) => {
  const [targetAmount, setTargetAmount] = useState<number>(initialTarget);
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    setTargetAmount(initialTarget); // Reset targetAmount when modal opens
    setEndDate("");
  }, [initialTarget, open]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (isNaN(targetAmount) || targetAmount <= 0) {
      alert("Please enter a valid target amount.");
      return;
    }

    if (!endDate) {
      alert("Please select an end date for the target period.");
      return;
    }

    onUpdate(targetAmount, endDate); // Pass only the targetAmount to onUpdate
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="font-semibold text-orange-500 text-lg">Set New Target</h2>
        </DialogHeader>
        <form className="flex flex-col gap-3" onSubmit={handleUpdate}>
          <div className="flex gap-2 items-center">
            <Label className="w-[80px]">Seller: </Label>
            <div className="flex-grow">
              <Input
                type="text"
                value={sellerName}
                readOnly
                className="!ring-0 !ring-offset-0 w-full"
              />
            </div>
          </div>
          <div className="flex gap-2 items-center max-w-2/3">
            <Label className="w-[80px]">Target Amount: </Label>
            <div className="flex-grow">
              <Input
                type="number"
                value={targetAmount}
                placeholder="5000"
                className="!ring-0 !ring-offset-0 w-full"
                onChange={(e) => setTargetAmount(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="flex gap-2 items-center max-w-2/3">
            <Label className="w-[80px]">End Date: </Label>
            <div className="flex-grow">
              <Input
                type="date"
                value={endDate}
                className="!ring-0 !ring-offset-0 w-full"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <Button className="flex gap-2" type="submit">
            Update
          </Button>
          <Button
            className="flex gap-2 mt-2"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SetTargetModal;
