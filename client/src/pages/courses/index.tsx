import { useState, useEffect } from 'react';
import { useCourseStore } from '@/stores/course-store';
import { DataTable } from '@/components/data-table';
import { columns } from './components/columns';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { CreateCourseDialog } from './create-course';

const CoursePage = () => {
  const { courses, isLoading, getCourses } = useCourseStore();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={courses}
        isLoading={isLoading}
        searchField="title"
        searchPlaceholder="Filter by course name..."
      />

      <CreateCourseDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </>
  );
};

export default CoursePage;
