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
import { Course } from '@/services/course-requests';
import { AlertTriangle } from 'lucide-react';

interface DeleteCourseDialogProps {
  course: Course;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteCourseDialog({
  course,
  open,
  onOpenChange,
}: DeleteCourseDialogProps) {
  const { deleteCourse, isLoading } = useCourseStore();

  const handleDelete = async () => {
    const success = await deleteCourse(course.id);

    if (success) {
      onOpenChange(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete Course
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this course? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-md bg-muted p-4">
            <div className="grid grid-cols-[1fr_2fr] gap-1">
              <p className="text-sm font-medium">Title:</p>
              <p className="text-sm">{course.title}</p>

              <p className="text-sm font-medium">Price:</p>
              <p className="text-sm">{formatPrice(course.price)}</p>

              <p className="text-sm font-medium">Videos:</p>
              <p className="text-sm">{course.videoCount}</p>

              <p className="text-sm font-medium">Duration:</p>
              <p className="text-sm">{course.duration} hours</p>

              <p className="text-sm font-medium">Views:</p>
              <p className="text-sm">{course.viewCount}</p>
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
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete Course'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
