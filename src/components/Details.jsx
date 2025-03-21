import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { deleteInvoice, selectInvoice, toggleForm } from "../store/slice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "./PDF";
import { Download, X } from "lucide-react";

const Details = ({invoice}) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteInvoice(invoice.id));
    }

    const handleEdit = () => {
        dispatch(toggleForm());
    }

    return (
        <div className="bg-slate-800 rounded-lg p-8">
            <div className="flex flex-wrap items-center justify-end space-x-4 mb-8">
                <button onClick={handleEdit} className="px-6 py-3 rounded-full bg-slate-700 hover:bg-slate-600">
                    Edit
                </button>

                <PDFDownloadLink document={<PDF invoice={invoice} name="Albiona" />} fileName={`${invoice.client}.pdf`}
                    className="px-6 py-3 rounded-full bg-violet-500 hover:bg-violet-600">
                        {({ blob, url, loading, error }) => (
                            <span className="flex items-center space-x-2">
                                <Download size={20} className="me-2" />
                                {loading ? 'Loading...' : 'Download'}
                            </span>
                        )}
                </PDFDownloadLink>

                <button onClick={handleDelete} className="px-6 py-3 rounded-full bg-red-500 hover:bg-red-600">
                    Delete
                </button>

                <div>
                    <button onClick={() => dispatch(selectInvoice(null))} className="px-3 py-3 rounded-full bg-red-500 hover:bg-red-600">
                        <X size={25} />
                    </button>
                </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-xl font-bold md-2">{invoice.id}</h2>
                        {invoice.description && <span className="text-slate-400">{invoice.description}</span>}
                    </div>

                    <div className="text-right text-slate-400">
                        <p>{invoice.billing.address}</p>
                        <p>{invoice.billing.city}</p>
                        <p>{invoice.billing.country}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <p className="text-slate-400 md-2">Invoice Date</p>
                        <p className="font-bold md-2">{dayjs(invoice.date).format("DD/MM/YYYY")}</p>
                    </div>

                    <div>
                        <p className="text-slate-400 md-2">Client Details</p>
                        <p className="font-bold md-2">{invoice.client}</p>
                        <p className="text-slate-400 md-2">{invoice.billTo.address}</p>
                        <p className="text-slate-400 md-2">{invoice.billTo.number}</p>
                    </div>

                    <div>
                        <h2 className="text-slate-400 md-2">Sent to</h2>
                        <span className="font-bold md-2">{invoice.billTo.email}</span>
                    </div>
                </div>

                <div className="bg-slate-800 rounded-lg overflow-hidden">
                    <div className="p-8 overflow-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-slate-400">
                                    <th className="text-left">Item Name</th>
                                    <th className="text-center">QTY</th>
                                    <th className="text-right">Price</th>
                                    <th className="text-right">Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {invoice.items.map(i => (
                                    <tr className="text-white" key={i.id}>
                                        <td className="text-left">{i.name}</td>
                                        <td className="text-center">{i.quantity}</td>
                                        <td className="text-right">${i.price.toFixed(2)}</td>
                                        <td className="text-right">${i.total.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-slate-900 p-8 flex space-x-4 items-center justify-between overflow-auto">
                        <span className="text-white">Total Amount</span>
                        <span className="text-xl font-bold">${invoice.amount.toFixed(2)}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Details;