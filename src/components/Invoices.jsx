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
        <div className="w-full space-y-4 p-2">
            {invoices.map(invoice => (
                <div key={invoice.id} onClick={() => handleSelect(invoice)} className="bg-slate-800 overflow-auto p-6 rounded flex flex-wrap @3xl:flex-wrap items-center justify-between hover:bg-slate-700 cursor-pointer">
                    <div className="flex items-center space-x-6">
                        <span className="text-slate-400">{invoice.id}</span>
                        <span className="text-slate-400">{invoice.date}</span>
                        <span className="text-slate-300">{invoice.client}</span>
                    </div>

                    <div className="flex items-center space-x-6">
                        <span className="text-xl font-bold">${invoice.amount.toFixed(2) || 0.00}</span>
                        
                        <ChevronRight className="container text-violet-500" />
                    </div>
                </div>
            ))} 
        </div>
    )
}

export default Invoices