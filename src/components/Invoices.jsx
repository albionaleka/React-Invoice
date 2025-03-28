import { ChevronRight } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { selectInvoice } from "../store/slice.js"

const Invoices = () => {
    const dispatch = useDispatch();
    const { invoices } = useSelector((state) => state.invoices);

    if (invoices.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <h1 className="text-3xl text-slate-400">No invoices found</h1>
            </div>
        )
    }

    const handleSelect = (invoice) => {
        dispatch(selectInvoice(invoice));
    }

    return (
        <div className="w-full space-x-4 space-y-4 p-2">
            {invoices.map(invoice => (
                <div key={invoice.id} onClick={() => handleSelect(invoice)} className="w-full bg-slate-800 space-x-4 overflow-auto p-6 rounded flex flex-wrap items-center justify-between hover:bg-slate-700 cursor-pointer">
                    <div className="flex flex-wrap items-center space-x-2 md:space-x-6">
                        <span className="text-slate-400 m-1">{invoice.id}</span>
                        <span className="text-slate-400 m-1">{invoice.date}</span>
                        <span className="text-slate-300 sm:ms-4 m-1 font-bold">{invoice.client}</span>
                    </div>

                    <div className="flex items-center space-x-6">
                        <span className="text-xl font-bold">{invoice.amount.toFixed(2) || 0.00}€</span>
                        <ChevronRight className="container text-rose-500" />
                    </div>
                </div>
            ))} 
        </div>
    )
}

export default Invoices