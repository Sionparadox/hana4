select * from v_emp_dept;
desc Subject;

select * from Subject;
select * from Prof;
update Subject set prof = null where id = 3;

select s.*, ifnull(p.name, '부재중') as profName
  from Subject s left join Prof p on s.prof = p.id;
  
select * from v_subject where id = 4;

insert into Subject(name, prof) values ('김교수과목2', 1), ('박교수과목2', 2);

-- 교수별 담당 과목수
alter table Prof add column subjectcnt tinyint unsigned not null default 0 comment '담당과목수';

select group_concat(id), prof, count(*) cnt from Subject group by prof;

select * from Prof p inner join (select group_concat(id), prof, count(*) cnt
                            from Subject group by prof) sub
                on p.id = sub.prof;
                
update Prof p inner join (select group_concat(id), prof, count(*) cnt
                            from Subject group by prof) sub
                on p.id = sub.prof
   set p.subjectcnt = sub.cnt;

select * from Prof;
show triggers;
show triggers like 'Subject';

-- drop trigger Subject_AFTER_DELETE;

DELIMITER //
create trigger Subject_AFTER_DELETE after delete on Subject for each row
BEGIN
    update Prof set subjectcnt = subjectcnt - 1
     where id = OLD.prof;
END //
DELIMITER ;

select * from Prof;
select * from Subject;
insert into Subject(name, prof) values ('최교수과목2', 3);
delete from Subject where id = 10;

DELIMITER //
create trigger Subject_AFTER_UPDATE after UPDATE on Subject for each row
BEGIN
    update Prof set subjectcnt = subjectcnt - 1
     where id = OLD.prof and (NEW.prof is null or OLD.prof <> NEW.prof);
     
    update Prof set subjectcnt = subjectcnt + 1
     where id = NEW.prof and (OLD.prof is null or OLD.prof <> NEW.prof);
END //
DELIMITER ;

-- drop trigger Subject_AFTER_UPDATE;

update Subject set prof= 2 where id = 9;

select prof, count(*) from Subject group by prof;
select * from Prof;
select * from Subject;
update Subject set prof=3 where id = 3;
update Subject set prof=null where id = 3;

select (@rownum = @rownum + 1) rownum, s.*
 from Subject s, (select @rownum = 0) rn;
 
desc Emp;
desc Dept;
desc Major;

select * from v_emp_dept;

select *, f_empinfo(id) from Emp;

select f_empinfo(1000);

select * from Emp where id between 15 and 10;

call sp_emprange(15, 10);
call sp_emprange(-1, -5);

show procedure status where db='testdb';
show function status;

select * from Student;
select max(id) + 1 from Student;

call sp_student_bulk_insert(5);

insert into Student(name, birthdt, major, mobile, email)
  values('Leey', '871212', 2, '010-9999-8888', 'leey@gmail.com');
  
call sp_deptinfo('영부');

call sp_cnt('Emp');

desc Dept;
select id, dname, captain from Dept;
select * from Emp where id = 30;
call sp_deptsalary();




show global variables like '%max_execution_time%';
WITH RECURSIVE CteDept(id, pid, pname, dname, dx, h) AS 
(
    select id, pid, cast('' as char(31)), dname, 0, cast(id as char(10)) from Dept
     where pid = 0
    UNION ALL
    select d.id, d.pid, cte.dname, d.dname, dx + 1, concat(cte.h, '-', d.id)
      from Dept d inner join CteDept cte on d.pid = cte.id
)
select /*+ SET_VAR(cte_max_recursion_depth = 5) */ dx, dname, h from CteDept order by h;