import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="pagination"
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li data-slot="pagination-item" className={cn('', className)} {...props} />
  );
}

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & React.ComponentProps<typeof Button>;

function PaginationLink({
  className,
  isActive,
  disabled,
  size = 'default',
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      data-slot="pagination-link"
      aria-current={isActive ? 'page' : undefined}
      variant={isActive ? 'default' : 'outline'}
      size="icon"
      disabled={disabled}
      className={cn(
        'cursor-pointer size-9 rounded-lg text-sm font-medium',
        isActive
          ? 'bg-pink text-white shadow-sm hover:bg-pink/90 border-pink'
          : 'text-gray-600 hover:bg-gray-100',
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      data-slot="pagination-previous"
      aria-label="Go to previous page"
      size="default"
      disabled={disabled}
      className={cn('gap-1 pl-2.5 cursor-pointer', className)}
      {...props}
    >
      <ChevronLeft className="size-4" />
      <span className="hidden sm:inline">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      data-slot="pagination-next"
      aria-label="Go to next page"
      size="default"
      disabled={disabled}
      className={cn('gap-1 pr-2.5 cursor-pointer', className)}
      {...props}
    >
      <span className="hidden sm:inline">Next</span>
      <ChevronRight className="size-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="pagination-ellipsis"
      aria-hidden
      className={cn(
        'flex size-9 items-center justify-center text-sm text-gray-400',
        className
      )}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
