import Header from "./Header";
import Invoices from "./Invoices";
import InvoiceForm from "./InvoiceForm";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../store/slice";
import Details from "./Details";

const Content = () => {
    const dispatch = useDispatch();
    const { formOpen, selectedInvoice } = useSelector((state) => state.invoices);

    const handleCreate = () => {
      dispatch(toggleForm());
    }

    const handleInfo = () => {
        dispatch(toggleInfo());
    }

    return (
        <div className="bg-slate-900 text-white min-h-screen p-1 md:p-4">
            <div className="mx-auto max-w-5xl py-12 px-1 md:px-4">
                <Header onNewInvoice={handleCreate} onInfo={handleInfo} />

                {selectedInvoice ? <Details invoice={selectedInvoice} /> : <Invoices />}

                {formOpen && <InvoiceForm invoice={selectedInvoice} />}
            </div>
        </div>
    )
}

export default Content