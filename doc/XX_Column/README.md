Example column for layered architecture.

Rules:

- Columns and rows are numbered and can together be understood as a table.
  A table cell can access another table cell if its column and row numbers are both
  smaller or equal than the target cell.
  -- Exception: If two columns have the same number, they are inaccessible to each other
  (this avoids arbitrary decisions about column positions)
- Unused subdirectories can be pruned
- TDD is your friend
