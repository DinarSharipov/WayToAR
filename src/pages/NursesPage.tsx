import { FC, memo, useEffect, useId, useState } from "react";
import { useDispatch } from "react-redux";
import { PlusIcon } from "../components/Icons/PlusIcon.tsx";
import { Input } from "../components/Input/Input.tsx";
import Modal from "../components/Modal/Modal.tsx";
import { Select } from "../components/Select/Select.tsx";
import { Table } from "../components/Table/Table";
import { TableActionCell } from "../components/Table/TableActionCell.tsx";
import { Column } from "../components/Table/types";
import { addNurse, addNurses, deleteNurse, editNurse } from "../store/personsSlice";
import { useAppSelector } from "../store/store";
import { Department, INurse } from "../store/types";

const NursesPage: FC = memo(() => {
  const [nurse, setNurse] = useState<INurse>()
  const { nurses = [] } = useAppSelector((state) => state.personsSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addNurses({ count: 10 }));
  }, []);

  const columns: Column<INurse>[] = [
    {
      header: "Фамилия",
      key: "secondName",
    },
    {
      header: "Имя",
      key: "name",
    },
    {
      header: "Отчество",
      key: "patronymic",
    },
    {
      header: "Отделение",
      key: "department",
      cell: (row) => Department[row.department]
    },
    {
      header: 'Действия',
      cell: (row) => TableActionCell({
        onDelete: () => dispatch(deleteNurse(row.id)),
        onEdit: () => setNurse(row)
      }),
      width: '50px'
    }
  ];

  const saveHandler = () => {
    if (nurse) {
      dispatch(nurse.id ? editNurse(nurse) : addNurse({
        ...nurse,
        id: useId(),
      }))
      setNurse(undefined)
    }
  }

  return (
    <>
      <Table header={
        <div className="flex items-center gap-2">
          <div>Медсестры</div>
          <PlusIcon className="cursor-pointer" onClick={() => setNurse({
            name: "",
            department: 'cardiology',
            id: '',
            secondName: ''
          })} />
        </div>
      } data={nurses} rowSelectCallback={(row) => setNurse(row)} columns={columns} />
      {nurse && (
        <Modal>
          <div className="flex flex-col gap-4">
            <div>{nurse.id ? 'Редактирование карточки пользователя' : 'Создание карточки пользователя'}</div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Имя"
                onChange={(name) => setNurse({
                  ...nurse,
                  name
                })}
                value={nurse.name}
              />
              <Input
                label="Фамилия"
                onChange={(secondName) => setNurse({
                  ...nurse,
                  secondName
                })}
                value={nurse.secondName}
              />
              <Input
                label="Отчество"
                onChange={(patronymic) => setNurse({
                  ...nurse,
                  patronymic
                })}
                value={nurse.patronymic}
              />
              <Select
                label="Отделение"
                onSelect={(patronymic) => setNurse({
                  ...nurse,
                  department: patronymic.value as keyof typeof Department
                })}
                options={Object.entries(Department)?.map(([value, label]) => ({ label, value }))}
                value={{
                  label: nurse.department ? Department[nurse.department] : '',
                  value: nurse.department
                }}
              />
            </div>
            <div className="flex gap-4 justify-end">
              <button className="cursor-pointer bg-blue-200 p-2 rounded-md" onClick={saveHandler}>{nurse.id ? 'Сохранить' : 'Создать'}</button>
              <button className="cursor-pointer bg-slate-200 p-2 rounded-md" onClick={() => setNurse(undefined)}>Отмена</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
});

export { NursesPage };

