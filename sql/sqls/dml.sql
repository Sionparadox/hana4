select * from Major;
update Major set name='소프트웨어학과' where id = 3;

select * from Major limit 0, 2;
select * from Major limit 3, 2;
desc Major;
insert into Major(name) values ('철학과');

insert into Major(name)
  values ('컴퓨터공학과'), ('소프트웨어공학과');
  
insert into Major(name) select '산업공학과' from dual;

insert into Major set name = '경제학과';
insert into Major set name = '경영학과';

select 1 + 2 from dual;

select * from Student;
desc Student;

insert into Student(name, birthdt, major, mobile, email)
             values('Hong', '990102', 1, '010-2323-4545', 'hong@gmail.com');
             
insert into Student(name, birthdt, major, mobile, email)
             values('Kim', '980302', 5, '010-2323-7878', 'kim@gmail.com');
             
-- 0 row affected
insert ignore into Student(name, birthdt, major, mobile, email)
             values('Kim2', '980305', 4, '010-2323-7879', 'kim@gmail.com');
             
-- 2 row(s) affected             
insert into Student(name, birthdt, major, mobile, email)
             values('Kim', '980302', 5, '010-2323-7878', 'kim@gmail.com')
    on duplicate key update name='Kim2';
             
insert into Student(name, birthdt, major, mobile, email)
             values('Lee', '980302', 5, '010-2323-7878', 'lee@gmail.com');
             
insert into Student(name, birthdt, major, mobile, email)
             values('Choi', '970302', null, '010-2323-9898', 'choi@gmail.com');

select * from Student where name = 'Kim';
select * from Student where gender = 0;
select * from Student where birthdt like '98%';
select * from Student where birthdt between '980101' and '981231';
select * from Student where birthdt >= '980101' and birthdt <= '981231';
select * from Student where major in (5, 6);
select * from Student where major in (5, 6) order by name desc;
select * from Student where major = 5 or major = 6;
select * from Student where major in (select major from Student where major >= 5);
select * from Student where major in (select distinct major from Student where major >= 5);
select * from Student where major = (select min(major) from Student);
select * from Student where major > ANY(select major from Student);
select * from Student where major > SOME(select major from Student);
select * from Student where major < ALL(select major from Student);
select * from Student order by rand();
select * from Student order by id desc limit 2;
select major, count(*) cnt from Student where id > 0 group by major having count(*) > 1;
select major, count(*) as cnt from Student where id > 0 group by major having cnt > 1;

select major from Student where major >= 5;
select * from Student;
select distinct major from Student where major >= 5;
select max(major), min(birthdt) from Student;
select max(major), min(major) from Student;

select * from Student inner join Major on Student.major = Major.id where Student.id >= 2;

select * from Student s inner join Major m on s.major = m.id where s.id >= 2;

select * from Student s left outer join Major m on s.major = m.id;

select * from Student s right outer join Major m on s.major = m.id;

select * from Major where id <= 3
UNION
select * from Major where id >= 3;

select * from Student s left outer join Major m on s.major = m.id
UNION ALL
select * from Student s right outer join Major m on s.major = m.id;

-- select * from Student s full outer join Major m on s.major = m.id;


select * from Student inner join Major on Student.major = Major.id where Student.id >= 2;

-- insert ignore
select * from Student;
select * from Major;
select s.*, m.name
 from Student s inner join Major m on s.major = m.id;

desc Student;
show index from Student;

select * from Prof;
desc Prof;
insert into Prof(name) values('김교수');
insert into Prof(name) values('박교수');
insert into Prof(name) values('최교수');
insert into Prof(name) values('홍교수');

select * from Subject;
insert into Subject(name, prof)
 select concat(p.name, '과목'), p.id from Prof p;

desc Subject;
show index from Subject;

select * from Enroll;
desc Enroll;

insert into Enroll(subject, student) values (1, 1), (2, 2), (3, 5), (4, 6);

select * from Student; -- 1,2,5,6

-- 수강신청한 과목 명도 함께 출력
select e.*, sub.name as subjectName
  from Enroll e inner join Subject sub on e.subject = sub.id;
  
-- 수강신청한 과목 명과 학생 명도 함께 출력
select e.*, sub.name as subjectName, stu.name as studentName
  from Enroll e inner join Subject sub on e.subject = sub.id
                inner join Student stu on e.student = stu.id;
  
-- 수강신청한 학생의 과까지 출력
select e.*, sub.name as subjectName, stu.name as studentName,
       m.name as studentMajor
  from Enroll e inner join Subject sub on e.subject = sub.id
                inner join Student stu on e.student = stu.id
                left outer join Major m on stu.major = m.id;

show processlist;

select * from Student where major is null;
select * from Student where major = (select max(major) from Student);
select * from Student where (select max(major) from Student) = major;

-- bad
select *, (select name from Major where id = Student.major) 
  from Student;
  
-- good
select s.*, m.name from Student s left join Major m on s.major = m.id;

-- bad
select s.*, sub.name
  from Student s inner join (select * from Major where id <= 3) sub
        on s.major = sub.id;

-- not bad
select s.*, m.name
  from Student s inner join Major m on s.major = m.id and m.id <= 3;
        
-- good
select s.*, m.name
  from Student s inner join Major m on s.major = m.id
 where m.id <= 3;

-- 평균 급여보다 높은 부서명과 그 부서의 최고 연봉자 구하기
select * from Emp;
select avg(salary) from Emp;
select dept, avg(salary) from Emp group by dept;

select dept, avg(salary) avgsal, max(salary), max(ename) from Emp
 group by dept having avg(salary) > (select avg(salary) from Emp);
 
select sub.* 
from (select dept, avg(salary) avgsal, max(salary) maxsal from Emp
       group by dept having avg(salary) > (select avg(salary) from Emp)) sub;

select * from Emp
-- update Emp set salary = 800
 where dept = 2 and salary= 900;       

-- not bad
select sub.*, e.*
  from Emp e inner join (select dept, avg(salary) avgsal, max(salary) maxsal from Emp
                          group by dept having avgsal > (select avg(salary) from Emp)) sub
             on e.dept = sub.dept and e.salary = sub.maxsal
 order by e.dept, e.ename;
 
select e.*, sub.salary as avgsal, sub.maxsal
  from Emp e inner join (select avg(salary) salary, max(salary) maxsal from Emp) sub
             on e.salary = sub.maxsal
 order by e.dept, e.id;
  
-- not bad
select e.*, sub.avgsal, sub.maxsal
  from (select avg(salary) avgsal, max(salary) maxsal from Emp) sub
    inner join (select dept, avg(salary) avgsal, max(salary) maxsal from Emp group by dept) grp
            on sub.avgsal < grp.avgsal
    inner join Emp e on grp.dept = e.dept and e.salary = grp.maxsal
 order by e.dept, e.id;

-- good 
select e1.*, e2.id, e2.ename
  from Emp e1 left join Emp e2 on e1.dept = e2.dept and e1.salary < e2.salary
 where e2.id is null
 order by e1.dept;

select e1.*, e2.id, e2.ename
  from Emp e1 left join Emp e2 on e1.dept = e2.dept and e1.salary < e2.salary
 where e2.id is null 
   and e1.dept in (select dept from Emp 
                    group by dept having avg(salary) > (select avg(salary) from Emp))
 order by e1.dept;
 
select sub.*, e.*
  from Emp e inner join (select dept, avg(salary) avgsal, max(salary) maxsal from Emp
                          group by dept having avgsal > (select avg(salary) from Emp)) sub
             on e.dept = sub.dept and e.salary = sub.maxsal
 order by e.dept, e.ename;

-- ex) min(ename) -> captain
update Dept set captain = null where id > 0;

-- 1. 부서별 이름이 가장 빠른 직원 
select dept, min(ename), min(id) from Emp group by dept;

select * from Emp where ename in (select min(ename) from Emp group by dept);
show index from Emp;

select * from Emp where dept = 1 and ename = '김나나';

-- best
select e1.*, e2.id
  from Emp e1 left join Emp e2 on e1.dept = e2.dept and e1.ename > e2.ename
 where e2.id is null;
 
-- 위 직원을 captain으로!
-- select d.*, e.* from Dept d
-- 
update Dept d 
   inner join
      (select e1.dept, e1.id
         from Emp e1 left join Emp e2
                     on e1.dept = e2.dept and e1.ename > e2.ename
        where e2.id is null) e
   on d.id = e.dept
  set d.captain = e.id
 where d.id > 0;
   
-- 결과 확인
select * from Dept;
select d.*, e.dept, e.ename from Dept d inner join Emp e on d.captain = e.id;

select dept, avg(salary) avgsal, max(salary) maxsal from Emp
 group by dept having avgsal > (select avg(salary) from Emp);
 
select e.*, d.dname
  from Emp e inner join Dept d on e.dept = d.id;
  