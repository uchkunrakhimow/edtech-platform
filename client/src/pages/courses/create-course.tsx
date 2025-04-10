import { useState } from 'react';
import { useCourseStore } from '@/stores/course-store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CreateCourseData } from '@/services/course-requests';

interface CreateCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  instructorId?: string; // Optional: Pre-fill instructor ID if available
}

export function CreateCourseDialog({
  open,
  onOpenChange,
  instructorId,
}: CreateCourseDialogProps) {
  const { createCourse, isLoading } = useCourseStore();

  const [formData, setFormData] = useState<CreateCourseData>({
    title: '',
    description: '',
    price: 0,
    videoCount: 0,
    duration: 0,
    instructorId: instructorId || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    if (formData.price < 0) {
      newErrors.price = 'Price cannot be negative';
    }

    if (formData.videoCount <= 0) {
      newErrors.videoCount = 'Video count must be greater than 0';
    }

    if (formData.duration <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    }

    if (!formData.instructorId) {
      newErrors.instructorId = 'Instructor ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Handle numeric fields correctly
    if (name === 'price' || name === 'videoCount' || name === 'duration') {
      setFormData((prev) => ({
        ...prev,
        [name]: value === '' ? 0 : Number(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const success = await createCourse(formData);

    if (success) {
      // Reset form data
      setFormData({
        title: '',
        description: '',
        price: 0,
        videoCount: 0,
        duration: 0,
        instructorId: instructorId || '',
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>
              Add a new course to the platform. Fill in all the required
              details.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Course title"
                  className={errors.title ? 'border-destructive' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <div className="col-span-3 space-y-1">
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Course description"
                  className={errors.description ? 'border-destructive' : ''}
                  rows={4}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price ($)
              </Label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="99.99"
                  className={errors.price ? 'border-destructive' : ''}
                />
                {errors.price && (
                  <p className="text-sm text-destructive">{errors.price}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="videoCount" className="text-right">
                Videos
              </Label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="videoCount"
                  name="videoCount"
                  type="number"
                  min="1"
                  step="1"
                  value={formData.videoCount}
                  onChange={handleChange}
                  placeholder="Number of videos"
                  className={errors.videoCount ? 'border-destructive' : ''}
                />
                {errors.videoCount && (
                  <p className="text-sm text-destructive">
                    {errors.videoCount}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration (hrs)
              </Label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Total hours"
                  className={errors.duration ? 'border-destructive' : ''}
                />
                {errors.duration && (
                  <p className="text-sm text-destructive">{errors.duration}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="instructorId" className="text-right">
                Instructor ID
              </Label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="instructorId"
                  name="instructorId"
                  value={formData.instructorId}
                  onChange={handleChange}
                  placeholder="Instructor ID"
                  className={errors.instructorId ? 'border-destructive' : ''}
                  disabled={!!instructorId} // Disable if instructorId is provided
                />
                {errors.instructorId && (
                  <p className="text-sm text-destructive">
                    {errors.instructorId}
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Course'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
