WITH 
  AvgSal AS (
    select d.dname, avg(e.salary) avgsal
      from Dept d inner join Emp e on d.id = e.dept
     group by d.id
  ),
  MaxAvgSal AS (
    select * from AvgSal order by avgsal desc limit 1
  ),
  MinAvgSal AS (
    select * from AvgSal order by avgsal limit 1
  ),
  SumUp AS (
    select '최고' as gb, m1.* from MaxAvgSal m1
    UNION
    select '최저' as gb, m2.* from MinAvgSal m2
  )
select gb, dname, format(avgsal * 10000,0) from SumUp
UNION
select '', '차액', format( (max(avgsal) - min(avgsal)) * 10000, 0) from SumUp;


WITH RECURSIVE fibonacci (n, fib_n, next_fib_n) AS
(
    select 1, 0, 1
    UNION ALL
    select n + 1, next_fib_n, fib_n + next_fib_n
      from fibonacci where n < 10
)
select * from fibonacci;


WITH RECURSIVE CteDept(id, pid, dname, depth, h) AS(
	select id, pid, dname, 0, cast(id as char(30)) from Dept where pid=0
    UNION ALL
    select d.id, d.pid, d.dname, depth+1, concat(c.h, '-', d.id) from CteDept c inner join Dept d on c.id = d.pid
)
select concat(repeat('↳',dpeth), ' ',dname) from CteDept;