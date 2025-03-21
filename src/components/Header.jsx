import { Plus } from "lucide-react";
import { useSelector } from "react-redux";

const status = ["all", "pending", "paid"];

const Header = ({ onNewInvoice }) => {
    const { invoices } = useSelector((state) => state.invoices);

    return (
        <header className="flex flex-wrap items-center justify-around mb-8">
            <div>
                <h1 className="text-3xl font-bold text-rose-600 mb-2">Invoice</h1>
                <p className="text-slate-400">{invoices.length === 0 ? 'No invoices generated' : `Total invoices:  ${invoices.length}`}</p>
            </div>

            <div className="flex items-center space-x-4">
                <button onClick={onNewInvoice} className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded-full flex items-center space-x-4">
                    <Plus size={20} style={{ paddingLeft: '5px' }} />
                    <span style={{padding: '5px'}}>New Invoice</span>
                </button>
            </div>
        </header>
    )
}

export default Header