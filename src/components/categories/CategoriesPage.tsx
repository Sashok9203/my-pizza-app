import React, { useEffect, useState } from 'react'
import { ICategoryItem, ICategorySearch } from './types'

import { categoryService } from '../../services/CategoryService'
import { imageUrl } from '../../helpers/constants';
import { Empty, Pagination, Progress } from 'antd';
import { AxiosProgressEvent, AxiosRequestConfig } from 'axios';
import { useSearchParams } from 'react-router-dom';
import { PaginationProps } from 'rc-pagination';
import { SearchProps } from 'antd/es/input';
import Search from 'antd/es/input/Search';
import QueryString from 'qs';



const CategoriesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [list, setList] = useState<ICategoryItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [searchData, setSearchData] = useState<ICategorySearch>(
    {
        search: searchParams.get("search")||"",
        perPage: 2,
        page: 1
    }
);

  const prog: AxiosRequestConfig = {
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
      if (progressEvent.total) {
        setProgress(Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        ))
      }
    }
  }

  useEffect(() => {
    (async () => {
      setProgress(0);
      setLoading(true)
      const searchText: string | null = searchParams.get("search")||''
      const response = await categoryService.getList({...searchData,search:searchText} , prog);
      if (response.status === 200) {
        setTotal(response.data.total)
        setList(response.data.data)
        setLoading(false)
       
      }
    })()
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  useEffect(()=>{
    const params:string = QueryString.stringify(searchData)||'';
    setSearchParams(params);
// eslint-disable-next-line react-hooks/exhaustive-deps
},[searchData])

  const onSearch: SearchProps['onSearch'] = (value) => {
    setSearchData({...searchData,search:value});
  }

  const onPaginationChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setSearchData({...searchData,page:current,perPage:pageSize});
  }

  return (
    <>

      <div className={"md:container mx-auto flex flex-col"}>
        <h1 className={"text-center my-[20px] text-3xl sm:text-3xl text-slate-900 tracking-tight dark:text-slate-700"}>Меню</h1>
        <Search className=' mb-14' size="large" placeholder="Пошук по назві" allowClear onSearch={onSearch} />
        {!loading && list.length > 0 &&
          <>
             <div className={"grid  place-items-center grid-cols-1  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"}>
              {list.map(item => (
                <div key={item.id} className="max-w-sm rounded overflow-hidden shadow-lg">
                  <img className="w-full" src={imageUrl + '600_' + item.image} alt="Sunset in the mountains" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 text-center">{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              current={searchData.page}
              showSizeChanger
              onChange={onPaginationChange}
              defaultCurrent={1}
              total={total}
              pageSizeOptions={[2, 4, 8, 10]}
              pageSize={searchData.perPage}
              className=' mt-10  mr-14 self-end'
            />
          </>
        }
      </div>
      {loading && <Progress percent={progress} success={{ percent: progress }} />}
      {!loading && list.length === 0 && <Empty className=' mx-auto mt-6' />}

    </>
  )
}

export default CategoriesPage