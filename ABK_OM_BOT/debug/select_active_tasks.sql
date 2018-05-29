--i = 7;
select *
  from (select a.*, rownum rn
          from (select t.bpd_instance_id,
                       t.task_id,
                       t.subject,
                       t.rcvd_datetime,
                       t.due_time
                  from V_ACTIVE_TASKS_FOR_DUE_DATE t
                 where lower(t.user_name) = 'u5945'
                 order by t.task_id desc) a)
 where rn between (3 * (7 - 1)) + 1 and (3) * 7;
