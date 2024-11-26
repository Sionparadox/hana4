show processlist;

select * from mysql.user;

select * from Emp;
desc Emp;
select * from Dept;

select *
  from Emp e inner join Dept d on e.dept = d.id
 where e.dept in (3,4);
 
-- select d.id as dept, d.dname, e.id, e.ename, d.captain from 
update Emp e inner join Dept d on e.dept = d.id
  set d.captain = e.id
 where e.dept = 3 and e.ename = '김나라';
 
select dept, min(ename) from Emp group by dept;

select * from Dept;
select e.*, d.dname, d.captain
  from Emp e inner join Dept d on e.dept = d.id and e.id = d.captain;

alter table Emp add column auth tinyint(1) not null default 9 
       comment '권한(0:sys, 1:super, …, 9:guest)' after dept;
       
alter table Dept add column captain int unsigned null comment '부서장';
alter table Dept add constraint foreign key fk_Dept_captain_Emp(captain) 
             references Emp(id) on DELETE set null on UPDATE cascade;

create table EmailLog (
  id int unsigned not null auto_increment,
  sender int unsigned not null comment '발신자 id',
  receiver varchar(1024) not null comment '수신자+참조',
  subject varchar(255) not null default '냉무' comment '제목',
  body text null comment '내용 및 첨부파일',
  PRIMARY KEY pk_EmailLog(id),
  constraint foreign key fk_EmailLog_sender_Emp(sender)
             references Emp(id) on DELETE no action on UPDATE cascade
);

select @@autocommit;

show create table Dept;
show index from Dept;
show table status;
show index from Emp;

select last_insert_id();
insert into Dept(pid, dname) values(2, '퍼블리셔팀');

alter table Emp add column outdt date null comment '퇴사일';

select *, curdate(), curtime(), now() from Emp where id in (3, 5, 10, 14, 26);

update Emp set outdt = '2024-04-25' where id in (3,5);

update Emp set outdt = curdate() where id in (14,26);

select * from Dept d inner join Emp e on d.captain = e.id;

update Dept d inner join Emp e on d.captain = e.id
   set d.captain = null
 where e.outdt is not null;
 
-- 확인
select * from Dept d left join Emp e on d.captain = e.id;