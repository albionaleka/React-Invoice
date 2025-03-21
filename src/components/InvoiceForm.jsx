import { Plus, Trash2, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux";
import { toggleForm, addInvoice, updateInvoice } from "../store/slice";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

const InvoiceForm = ({ invoice }) => {
    const dispatch = useDispatch();

    const [form, setForm] = useState(() => {
        if (invoice) {
            return { ...invoice };
        }
        
        return {
            id: `#${uuidv4().slice(0, 8)}`,
            status: "pending",
            billing: {
                name: "",
                address: "",
                email: "",
                number: ""
            },
            billTo: {
                email: "",
                address: "",
                number: "",
            },
            client: "",
            description: "",
            date: dayjs().format("YYYY-MM-DD"),
            amount: 0,
            items: [],
            tax: 0
        }
    });

    useEffect(() => {
        if (invoice) {
            setForm(invoice);
        }
    }, [invoice]);

    const addItem = () => {
        setForm({
            ...form,
            items: [
                ...form.items,
                {
                    id: uuidv4(),
                    name: "",
                    quantity: 1,
                    price: 0,
                    total: 0
                }
            ]
        });
    }

    const updateItems = (index, field, value) => {
        const newItems = [...form.items];

        newItems[index][field] = value;

        if (field === "price" || field === "quantity") {
            const qty = field === "quantity" ? value : newItems[index].quantity || 1;
            const price = field === "price" ? value : newItems[index].price || 0;

            newItems[index].total = price * qty;
        }

        setForm({
            ...form,
            items: newItems
        })
    }

    const deleteItem = (index) => {
        setForm({
            ...form,
            items: form.items.filter((_, i) => i !== index)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (invoice) {
            dispatch(updateInvoice(form));
            dispatch(toggleForm());
        } else {
            dispatch(addInvoice(form));
            dispatch(toggleForm());
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center overflow-y-auto">
            <div className="bg-slate-800 p-8 rounded-lg w-full max-w-2xl mt-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">New Invoice</h2>

                    <button onClick={() => dispatch(toggleForm())} className="text-slate-400 hover:text-red-500">
                        <X size={24} />
                    </button>
                </div>

                <form className="space-y-6">
                    <div>
                        <h3 className="text-violet-500 font-bold mb-4">Billing Info</h3>
                        <input type="text" placeholder="Company Name" required className="bg-slate-900 w-full rounded-lg p-3 mb-4" value={form.billing.name} 
                            onChange={e => setForm({
                                ...form, 
                                billing: {
                                    ...form.billing, 
                                    name: e.target.value
                                }
                            })} />

                        <input type="text" placeholder="Address" required className="bg-slate-900 w-full rounded-lg p-3" value={form.billing.address} 
                            onChange={e => setForm({
                                ...form, 
                                billing: {
                                    ...form.billing, 
                                    address: e.target.value
                                }
                            })} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Email" required className="bg-slate-900 w-full rounded-lg p-3" value={form.billing.email}
                            onChange={e => setForm({
                                ...form, 
                                billing: {
                                    ...form.billing, 
                                    email: e.target.value
                                }
                            })} />

                        <input type="text" placeholder="Number" required className="bg-slate-900 w-full rounded-lg p-3" value={form.billing.number}
                            onChange={e => setForm({
                                ...form, 
                                billing: {
                                    ...form.billing, 
                                    number: e.target.value
                                }
                            })} />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-violet-500 font-bold">Client Details</h3>
                        <input type="text" placeholder="Name" required className="bg-slate-900 w-full rounded-lg p-3" value={form.client}
                            onChange={e => setForm({
                                ...form,
                                client: e.target.value
                            })} />

                        <input type="text" placeholder="Email" className="bg-slate-900 w-full rounded-lg p-3" value={form.billTo.email}
                            onChange={e => setForm({
                                ...form, 
                                billTo: {
                                    ...form.billTo,
                                    email: e.target.value
                                }
                            })} />

                        <input type="text" placeholder="Client's Address" required className="bg-slate-900 w-full rounded-lg p-3" value={form.billTo.address}
                            onChange={e => setForm({
                                ...form, 
                                billTo: {
                                    ...form.billTo,
                                    address: e.target.value
                                }
                            })} />
                    </div>

                    <div className="grid grid-cols-3 gap-4">                  
                        <input type="text" placeholder="Client's Number" required className="bg-slate-900 w-full rounded-lg p-3" value={form.billTo.number}
                            onChange={e => setForm({
                                ...form, 
                                billTo: {
                                    ...form.billTo,
                                    number: e.target.value
                                }
                            })} />

                        <input type="date" className="bg-slate-900 w-full rounded-lg p-3" value={form.date}
                            onChange={e => setForm({
                                ...form, 
                                date: e.target.value
                            })} />

                        <input type="number" className="bg-slate-900 w-full rounded-lg p-3" value={form.tax} onChange={e => setForm({...form, tax: e.target.value})} />
                    </div>

                    <div className="space-y-4">
                        <input type="text" placeholder="Description" className="w-full bg-slate-900 rounded-lg p-3" value={form.description}
                            onChange={e => setForm({
                                ...form, 
                                description: e.target.value
                            })} />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-violet-500 font-bold">Item List</h3>
                        
                        {form.items.map((item, index) => (
                            <div key={index} className="grid grid-cols-12 gap-4 items-center">
                                <input type="text" placeholder="Item Name" required className="bg-slate-900 rounded-lg p-3 col-span-5"
                                    onChange={e => updateItems(index, 'name', e.target.value)} />

                                <input type="number" placeholder="Qty." min="1" required className="bg-slate-900 rounded-lg p-3 col-span-2"
                                    onChange={e => updateItems(index, 'quantity', parseInt(e.target.value))} />

                                <input type="number" placeholder="Price" min="0" step="0.01" required className="bg-slate-900 rounded-lg p-3 col-span-2"
                                    onChange={e => updateItems(index, 'price', parseFloat(e.target.value))} />

                                <div className="col-span-2 text-right">
                                    {item.total.toFixed(2)}$
                                </div>

                                <button type="button" onClick={() => deleteItem(index)} className="col-span-1 text-slate-400 hover:text-red-500">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}

                        <button type="button" className="w-full bg-slate-700 hover:bg-slate-600 p-3 rounded-lg flex items-center justify-center space-x-2" onClick={addItem}>
                            <Plus size={20} />
                            <span>Add Item</span>
                        </button>

                        <div className="flex justify-end space-x-4">
                            <button type="button" onClick={() => dispatch(toggleForm())} className="w-full bg-slate-700 hover:bg-slate-600 rounded-full p-3 text-white">
                                Cancel
                            </button>

                            <button type="submit" onClick={handleSubmit} className="w-full bg-rose-500 hover:bg-rose-600 rounded-full p-3 text-white">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default InvoiceForm