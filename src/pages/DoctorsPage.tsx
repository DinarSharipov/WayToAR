import { FC, memo, useEffect, useId, useState } from "react";
import { useDispatch } from "react-redux";
import { PlusIcon } from "../components/Icons/PlusIcon.tsx";
import { Input } from "../components/Input/Input.tsx";
import Modal from "../components/Modal/Modal.tsx";
import { Select } from "../components/Select/Select.tsx";
import { Table } from "../components/Table/Table";
import { TableActionCell } from "../components/Table/TableActionCell.tsx";
import { Column } from "../components/Table/types";
import { addDoctor, addDoctors, deleteDoctor, editDoctor } from "../store/personsSlice";
import { useAppSelector } from "../store/store";
import { Department, IDoctor } from "../store/types";

const DoctorsPage: FC = memo(() => {
  const [doctor, setDoctor] = useState<IDoctor>()
  const { doctors = [] } = useAppSelector((state) => state.personsSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addDoctors({ count: 10 }));
  }, []);

  const columns: Column<IDoctor>[] = [
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
      header: "Должность",
      key: "isManager",
      cell: (row) => row.isManager ? 'Заведующий врач' : 'Врач'
    },
    {
      header: 'Действия',
      cell: (row) => TableActionCell({
        onDelete: () => dispatch(deleteDoctor(row.id)),
        onEdit: () => setDoctor(row)
      }),
      width: '50px'
    }
  ];

  const saveHandler = () => {
    if (doctor) {
      dispatch(doctor.id ? editDoctor(doctor) : addDoctor({
        ...doctor,
        id: useId(),
      }))
      setDoctor(undefined)
    }
  }

  return (
    <>
      <Table header={
        <div className="flex items-center gap-2">
          <div>Врачи</div>
          <PlusIcon className="cursor-pointer" onClick={() => setDoctor({
            name: "",
            department: 'cardiology',
            id: '',
            secondName: ''
          })} />
        </div>
      } data={doctors} rowSelectCallback={(row) => setDoctor(row)} columns={columns} />
      {doctor && (
        <Modal>
          <div className="flex flex-col gap-4">
            <div>{doctor.id ? 'Редактирование карточки пользователя' : 'Создание карточки пользователя'}</div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Имя"
                onChange={(name) => setDoctor({
                  ...doctor,
                  name
                })}
                value={doctor.name}
              />
              <Input
                label="Фамилия"
                onChange={(secondName) => setDoctor({
                  ...doctor,
                  secondName
                })}
                value={doctor.secondName}
              />
              <Input
                label="Отчество"
                onChange={(patronymic) => setDoctor({
                  ...doctor,
                  patronymic
                })}
                value={doctor.patronymic}
              />
              <Select
                label="Отделение"
                onSelect={(patronymic) => setDoctor({
                  ...doctor,
                  department: patronymic.value as keyof typeof Department
                })}
                options={Object.entries(Department)?.map(([value, label]) => ({ label, value }))}
                value={{
                  label: doctor.department ? Department[doctor.department] : '',
                  value: doctor.department
                }}
              />
              <div className="flex gap-2 items-center justify-between">
                <label htmlFor="manager">Заведующий</label>
                <input id="manager" type="checkbox" checked={!!doctor.isManager} onChange={(e) => {
                  setDoctor({ ...doctor, isManager: e.target.checked })
                }} className="mt-0.5" />
              </div>
            </div>
            <div className="flex gap-4 justify-end">
              <button className="cursor-pointer bg-blue-200 p-2 rounded-md" onClick={saveHandler}>{doctor.id ? 'Сохранить' : 'Создать'}</button>
              <button className="cursor-pointer bg-slate-200 p-2 rounded-md" onClick={() => setDoctor(undefined)}>Отмена</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
});

export { DoctorsPage };

