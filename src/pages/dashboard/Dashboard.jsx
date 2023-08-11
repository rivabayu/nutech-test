import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai'
import List from '../../component/List'
import { useStateValue } from '../../redux/StateProvider'
import { Link } from 'react-router-dom'
import Helmet from '../../component/Helmet';
import CommonSection from '../../component/CummonSections'


function Dashboard() {

    const [{ items }, dispatch] = useStateValue(0)
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchFilter, setSearchFilter] = useState('');

    const filteredItems = items.filter(item => {

        if (categoryFilter && item.category !== categoryFilter) {
            return false;
        }

        if (searchFilter && !item.title.toLowerCase().includes(searchFilter.toLowerCase())) {
            return false;
        }
        return true;
    });
    return (
        <Helmet title='Dashboard'>
            <CommonSection title="Dashboard" />
            <div className='lg:px-32 lg:py-10 px-5 py-10 flex flex-col'>
                <div className='flex items-center text-black font-bold text-2xl'>
                    All Product
                </div>
                <div className='flex mt-10 justify-between'>
                    <div>
                        <select required
                            className="select rounded-lg bg-blue-300 border-2 border-black"
                            onChange={e => setCategoryFilter(e.target.value)}>
                            <option value="other" className="bg-white">
                                Select Category
                            </option>
                            <option value="electronik">Electronik</option>
                            <option value="Pakaian">Pakaian</option>
                            <option value="jam">Jam</option>
                            <option value="perabot">Perabot</option>
                        </select>
                    </div>
                    <dir>
                        <div className='flex items-center border-2 rounded-lg border-black lg:w-[40rem] justify-between cursor-pointer' >
                            <input type="search"
                                placeholder="Search"
                                className="h-[3rem] w-full  border-white border outline-none p-4"
                                value={searchFilter}
                                onChange={e => setSearchFilter(e.target.value)} />
                            <AiOutlineSearch className='text-3xl mr-4' />
                        </div>
                    </dir>
                    <div>
                        <Link to={'/addProduct'}>
                            <button className='p-2 btn capitalize border-2 hover:bg-white border-black rounded-lg bg-blue-300 hover:scale-90'>Add Product</button>
                        </Link>
                    </div>
                </div>
                <div className='mt-10'>
                    {
                        filteredItems.length === 0 ? <h1 className='flex justify-center text-xl font-semibold h-screen'>Produk Tidak Ditemukan</h1> :
                            <List
                                data={filteredItems}
                            />
                    }
                </div>
            </div>

        </Helmet>

    )
}

export default Dashboard