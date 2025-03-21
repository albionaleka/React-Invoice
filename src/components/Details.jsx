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
            <div className="flex space-y-4 flex-wrap grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center justify-end space-x-4 mb-8">
                <div className="col-span-1">
                    <button onClick={handleEdit} className="w-full px-6 py-3 rounded-full bg-slate-700 hover:bg-slate-600">
                        Edit
                    </button>
                </div>

                <PDFDownloadLink document={<PDF invoice={invoice} />} fileName={`${invoice.client}.pdf`}
                    className="w-full text-center col-span-1 px-6 py-3 rounded-full bg-slate-700 hover:bg-blue-900">
                        {({ loading }) => (
                            <span className="flex text-center justify-center items-center space-x-2">
                                <Download size={20} className="me-2" />
                                {loading ? 'Loading...' : 'Download'}
                            </span>
                        )}
                </PDFDownloadLink>

                <div className="col-span-1">
                    <button onClick={handleDelete} className="w-full space-x-4 px-6 py-3 rounded-full bg-red-500 hover:bg-red-600">
                        Delete
                    </button>
                </div>

                <div className="col-span-1 order-first lg:order-last flex justify-end mb-3">
                    <button onClick={() => dispatch(selectInvoice(null))} className="px-3 py-3 rounded-full bg-red-500 hover:bg-red-600">
                        <X size={25} />
                    </button>
                </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-8">
                <div className="flex flex-wrap space-y-4 items-center justify-between mb-8">
                    <div>
                        <h2 className="text-xl font-bold md-2">{invoice.id}</h2>
                        {invoice.description && <p className="text-slate-400 overflow-auto break-all">{invoice.description}</p>}
                    </div>

                    <div className="text-right text-slate-400">
                        <p>{invoice.billTo.address}</p>
                        <p>{invoice.billTo.city}</p>
                        <p>{invoice.billTo.country}</p>
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
                                        <td className="text-right">{i.price.toFixed(2)}€</td>
                                        <td className="text-right">{i.total.toFixed(2)}€</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-slate-900 p-8 flex space-x-4 items-center justify-between overflow-auto">
                        <span className="text-white">Total Amount</span>
                        <span className="text-xl font-bold">{invoice.amount.toFixed(2)}€</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Details;