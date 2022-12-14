import Head from "next/head";
import styles from './style.module.scss';
import { Header } from "../../components/Header";
import { useState,ChangeEvent,FormEvent } from 'react'
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-Toastify";


type ItemProps = {
    id:string;
    name:string;
}

interface CategoryProps{
    categoryList: ItemProps[];
}


export default function Product({ categoryList }:CategoryProps ){ 

    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState('');
    const [avatarUrl,setAvatarUrl] = useState('');
    const [imageAvatar,setImageAvatar] = useState(null);
    const [categories, setcategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);


    function handleFile(event:ChangeEvent<HTMLInputElement>){
        if(!event.target.files){
            return;
        }

        const image = event.target.files[0];

        if(!image){
            return;
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png'){
            setImageAvatar(image);
            //Cria um objeto de Url para mostrar a imagem
            setAvatarUrl(URL.createObjectURL(event.target.files[0]));
        }
    }

    function handleChangeCategory(event){
        setCategorySelected(event.target.value)
    }

    async function handleRegister(event:FormEvent){
        event.preventDefault();

        try {
            const data = new FormData();

            if(name === '' || price === '' || description === '' || imageAvatar === null){
                toast.error('Preencha todos os campos')
                return;
            }

            data.append('name',name);
            data.append('price',price);
            data.append('description',description);
            data.append('category_id',categories[categorySelected].id);
            data.append('file',imageAvatar);

            const apiClient = setupAPIClient();

            await apiClient.post('/product',data);

            toast.success('Cadastrado com Sucesso!');
            
        } catch (error) {
            console.log(error)
            toast.error("Ops, error ao cadastrar!")
        }

        setName('');
        setPrice('');
        setDescription('');
        setImageAvatar(null);
        setAvatarUrl('');
    }
    return(
        <>
        <Head>
            <title>Novo Produto - VocaMe</title>
        </Head>

        <div>
        <Header></Header>
        <main  className={styles.container}>
            <h1>Novo Produto</h1>

            <form className={styles.form} onSubmit={handleRegister}>

                <label className={styles.labelAvatar}>
                    <span>
                        <FiUpload size={35} color='#fff'></FiUpload>
                    </span>

                    <input type="file" accept="image/png, image/jpeg " onChange={handleFile}/>

                    {avatarUrl && (
                        <img
                        className={styles.preview}
                        src={avatarUrl}
                        alt="foto do produto"
                        width={250}
                        height={250}
                        />
                    )}


                </label>


                <select className={styles.input} value={categorySelected} onChange={handleChangeCategory}>
                    {categories.map( (item,index) => {
                        return(
                            <option key={item.id} value={index}> {item.name} </option>
                        )
                    })}
                </select>

                <input 
                type="text"
                placeholder="Digite o nome do produto"
                className={styles.input}
                onChange={ (e) => setName(e.target.value) }
                value={name}
                />

                <input 
                type="text"
                placeholder="Digite o preço do produto"
                className={styles.input}
                onChange={ (e) => setPrice(e.target.value) }
                value={price}
                />

                <textarea 
                placeholder="Descreva o produto"
                className={styles.input}
                onChange={ (e) => setDescription(e.target.value) }
                value={description}
                />

                <button className={styles.buttonAdd} type="submit">
                    Cadastrar
                </button>

            </form>

        </main>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/category');
    // console.log(response.data)
    return{
        props:{
            categoryList:response.data
        }
    }
})
