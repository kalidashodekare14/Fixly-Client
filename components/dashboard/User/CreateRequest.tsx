'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CreateRequest() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border p-6 md:p-8 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold">Create Service Request</h2>
          <p className="text-sm text-gray-500">
            Post your issue and get help from providers
          </p>
        </div>

        {/* Row 1 */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Service Category */}
          <div className="w-full">
            <Label>Service Category</Label>
            <Select>
              <SelectTrigger className="w-full h-12! mt-2">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="electric">Electric Repair</SelectItem>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="ac">AC Service</SelectItem>
                  <SelectItem value="cleaning">Home Cleaning</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Request Title */}
          <div>
            <Label>Request Title</Label>
            <Input className="h-12 mt-2" placeholder="e.g. AC not cooling" />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <Textarea
            className="min-h-30 mt-2"
            placeholder="Describe your issue in detail..."
          />
        </div>

        {/* Budget (Single Field) */}
        <div className="flex flex-col lg:flex-row items-center gap-5">
          <div className="w-full">
            <Label>Budget (BDT)</Label>
            <Input
              type="number"
              className="h-12 mt-2"
              placeholder="e.g. 2000"
            />
          </div>

          {/* Deadline */}
          <div className="w-full">
            <Label>Deadline</Label>
            <Input type="date" className="h-12 mt-2" />
          </div>
        </div>

        {/* File Upload */}
        <div>
          <Label>Attach File (optional)</Label>

          <div className="mt-2 border-2 border-dashed rounded-xl p-6 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
            <input
              type="file"
              className="hidden"
              id="fileUpload"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <label htmlFor="fileUpload" className="cursor-pointer">
              <p className="text-sm text-gray-600">
                {file ? file.name : 'Click or drag file to upload'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, PDF up to 10MB
              </p>
            </label>
          </div>
        </div>

        {/* Submit */}
        <Button className="w-full h-12 bg-[#E91E63] hover:bg-[#d81b60] text-white rounded-xl">
          Post Request
        </Button>
      </div>
    </div>
  );
}
