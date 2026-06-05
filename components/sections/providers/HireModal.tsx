'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface IHireModal {
  hireToggle: boolean;
  setHireToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const HireModal = ({ hireToggle, setHireToggle }: IHireModal) => {
  return (
    <Dialog open={hireToggle} onOpenChange={setHireToggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HireModal;
