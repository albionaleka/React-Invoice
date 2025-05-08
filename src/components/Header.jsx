import { Plus } from "lucide-react";
import { useSelector } from "react-redux";

const Header = ({ onNewInvoice, onInfo }) => {
    const { invoices } = useSelector((state) => state.invoices);

    return (
        <header className="flex flex-wrap items-center justify-around mb-8 space-x-4 space-y-4">
            <div>
                <h1 className="text-3xl font-bold text-rose-600 mb-2">Invoice</h1>
                <p className="text-slate-400">{invoices.length === 0 ? 'No invoices generated' : `Total invoices:  ${invoices.length}`}</p>
            </div>

            <div className="flex items-center">
                <button onClick={onNewInvoice} className="bg-rose-500 hover:bg-rose-600 text-white px-2 md:px-6 py-2 rounded-full flex items-center md:space-x-4">
                    <Plus size={25} />
                    <span className="hidden md:inline">New Invoice</span>
                </button>
            </div>
        </header>
    )
}

export default Header