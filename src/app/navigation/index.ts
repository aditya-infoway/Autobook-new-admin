import { accountingMaster } from "./segments/accountingMaster";
import { dashboards } from "./segments/dashboards";
import { accessoriesMaster} from "./segments/accessoriesMaster";
import { leadMaster } from "./segments/leadMaster";
import { logout } from "./segments/logout";
import { master } from "./segments/master";
import { purchaseMaster } from "./segments/purchaseMaster";
import { stockReport } from "./segments/stockReport";
import { userMaster } from "./segments/userMaster";
import { followup } from "./segments/followup";
import { salesMaster } from "./segments/salesMaster";
import { brokerMaster } from "./segments/brokerMaster";
import { integration } from "./segments/integration";

export const navigation = [
  dashboards,
  master,
  accessoriesMaster,
  leadMaster,
  accountingMaster,
  purchaseMaster,
  salesMaster,
  stockReport,
  userMaster,
  brokerMaster,
  followup,
  integration,
  logout,
];
