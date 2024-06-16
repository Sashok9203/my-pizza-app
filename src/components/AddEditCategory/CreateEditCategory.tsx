import React, { ChangeEvent, useState } from 'react'
import PageHeader from '../PageHeader/PageHeader'
import { categoryService } from '../../services/CategoryService';
import { useNavigate } from 'react-router-dom';



const CreateEditCategory: React.FC = () => {
  const navigate = useNavigate()
  const [preview, setPreview] = useState<string>('')
  const [file, setFile] = useState<File>()
  

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file)
      setPreview(URL.createObjectURL(file));
    }
  }

  const onSubmit = async () => {
     
    // const formData = new FormData();
    // formData.append('name', data.name);
    // if (file)
    //   formData.append('image', file);
    // const result = await categoryService.create(formData);
    // if (result.status === 201) {
    //   navigate(-1);
    // }
  }

  return (
    <>
      <PageHeader title="Нова категорія" />
      <form onSubmit={onSubmit} className="container max-w-sm w-auto mx-auto items-center py-32" encType="multipart/form-data" >
        <div className="sm:col-span-2 mb-5">
          <label htmlFor="name" className="block text-lg mb-5 font-medium leading-4 text-gray-400">
            Назва категорії
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="name"
              className="peer border-2 focus:ring-2 [.validated_&]:invalid:border-pink-600 [.validated_&]:invalid:ring-2 [.validated_&]:invalid:ring-pink-200  block w-full rounded-md px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            
            />
           
          </div>
        </div>
        <div id="img-uploader" className=" mx-auto">
          <label htmlFor="img-uploader" className="block text-lg mb-5 font-medium leading-4 text-gray-400">
            Фото для категорії
          </label>
          <div className="px-4 py-6 bg-white rounded-lg shadow-md overflow-hidden items-center">
            <div id="image-preview" className="max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer">
              <label htmlFor="image" className="cursor-pointer">
                {preview ?
                  <>
                    <img src={preview} className="max-h-48 rounded-lg mx-auto" alt="Image preview" />
                  </>
                  : <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 text-gray-700 mx-auto mb-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">Завантажте зображення</h5>
                    <p className="font-normal text-sm text-gray-400 md:px-6">Оберіть фото для категорії</p>
                    <p className="font-normal text-sm text-gray-400 md:px-6"><b className="text-gray-600">JPG, PNG, or GIF</b> format.</p>
                  </>}
              </label>
              <input id="image" name="image" onChange={onImageChange} type="file" className="hidden" accept="image/*" required />
            </div>
          </div>
        </div>
        <button type="submit"
          className="rounded-md bg-indigo-600 mt-5 w-full px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Додати</button>
      </form>
    </>
  )
}

export default CreateEditCategory