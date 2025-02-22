import { EditIcon } from "../Icons/EditIcon";
import { TrashbinIcon } from "../Icons/TrashbinIcon";

const TableActionCell = ({ onDelete, onEdit }: { onDelete?: () => void, onEdit?: () => void }) => (
  <div className="flex items-center gap-4 justify-center">
    {onEdit && <EditIcon onClick={onEdit} className="cursor-pointer" title="Редактировать" />}
    {onDelete && <TrashbinIcon onClick={onDelete} className="cursor-pointer" title="Удалить" />}
  </div>
)


export { TableActionCell };
