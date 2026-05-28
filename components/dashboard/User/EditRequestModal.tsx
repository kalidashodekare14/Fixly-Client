'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface IEditRequestModal {
  editModal: boolean;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditRequestModal = ({ editModal, setEditModal }: IEditRequestModal) => {
  return (
    <Dialog open={editModal} onOpenChange={setEditModal}>
      <DialogContent className="max-w-2xl! p-6 rounded-2xl">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Edit Request</h2>
          <p className="text-sm text-gray-500">
            Update your service request details
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row items-center gap-5">
            {/* Request Title */}
            <div className="w-full">
              <Label>Request Title</Label>
              <Input className="h-12 mt-2" placeholder="Enter title" />
            </div>

            {/* Category */}
            <div className="w-full">
              <Label>Category</Label>
              <Select>
                <SelectTrigger className="w-full h-12! mt-2">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ac">AC Service</SelectItem>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div>
            <Label>Message</Label>
            <Textarea
              className="min-h-30 mt-2"
              placeholder="Describe your issue..."
            />
          </div>

          {/* Budget + Deadline */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Budget (BDT)</Label>
              <Input type="number" className="h-12 mt-2" />
            </div>

            <div>
              <Label>Deadline</Label>
              <Input type="date" className="h-12 mt-2" />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <Label>Image</Label>

            <div className="mt-2 border-2 border-dashed rounded-xl p-5 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
              <input type="file" className="hidden" id="editImage" />

              <label htmlFor="editImage" className="cursor-pointer">
                <p className="text-sm text-gray-600">
                  Click or drag image to upload
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG up to 10MB
                </p>
              </label>
            </div>
          </div>

          {/* Button */}
          <Button className="w-full h-12 bg-[#E91E63] hover:bg-[#d81b60] text-white rounded-xl">
            Update Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRequestModal;
