import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
  export interface Product {
    _id: string;
    name: string;
    description: string;
    imageURL?: string;
    imageALT?: string;
    price: string;
    category: string;
}
export interface Favorite{
    _id?:string;
    userID:string;
    productID:string; 
}
export interface Cart{
    _id?:string;
    userID:string;
    productID:string;
    quantity?:Number
}
interface Props{
    background:string
    color:string
}
function Home({background,color}:Props){
    const [products, setProducts] = useState<Array<Product>>([]);
     const navigate = useNavigate();
   
    return(
    <>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto fugit aliquam provident dolorum explicabo illo non suscipit quibusdam inventore. Unde exercitationem veniam quos, ipsam ipsum molestias laboriosam natus commodi iusto possimus dicta voluptatibus nam consectetur. Numquam, voluptate cupiditate a dolores dolor nostrum porro, deleniti harum magnam nulla rem vel repellendus animi eligendi exercitationem, fugit dolorum consectetur odio soluta totam molestiae. Eaque qui earum aspernatur laborum aperiam consectetur voluptatibus. Neque non cupiditate ipsum mollitia iure, similique nobis quos. Maxime molestias, odit placeat, earum rem vitae illo exercitationem delectus sequi, eligendi distinctio error et. Culpa, praesentium eum nemo consequuntur eaque ducimus quos maxime doloremque repellat nulla suscipit nobis vel minima beatae amet consectetur quidem minus iure? Accusantium, dicta. Pariatur voluptas magnam odio quasi at fuga itaque! Rerum blanditiis officia quia cumque animi itaque vitae laborum impedit deserunt dicta! Deserunt mollitia, ipsam repellendus adipisci sunt ipsa nulla doloribus consequatur, aspernatur, commodi quod! Inventore delectus eum temporibus hic! Eaque obcaecati quas debitis facilis quod officia quidem, nesciunt labore facere totam, omnis odit optio aliquam in laudantium sunt ab rerum autem est qui accusantium quibusdam? Quisquam, distinctio explicabo quasi deleniti nihil necessitatibus error sint ipsum optio, a rerum eum laborum provident obcaecati quos accusantium! Recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, laborum atque, id obcaecati ex aliquam quis ullam quod nobis quam consequatur. Esse in pariatur et rem. Magni consectetur doloribus ipsum qui voluptatibus iste at optio autem, dignissimos blanditiis illum officiis architecto ipsam excepturi aspernatur sequi modi quasi, dolores nam veritatis sapiente nostrum. Qui est provident beatae at quidem mollitia aperiam, sint atque, voluptas eius excepturi illo vel repudiandae voluptates dolorem fugiat earum harum nobis quisquam corrupti maxime! Nesciunt beatae delectus ipsa ad! Accusantium consectetur distinctio autem sunt neque atque mollitia deleniti, tempora dolorem sint assumenda earum. Nisi mollitia veritatis incidunt libero veniam et voluptas ipsa tempora cumque! Atque voluptatem culpa necessitatibus sequi dignissimos voluptate facere numquam quo perspiciatis, error nihil maiores delectus odio esse magni unde obcaecati veniam excepturi maxime. Eos aspernatur magni autem quos ea explicabo. Adipisci distinctio hic nemo? Officia unde doloribus dolorem soluta rem placeat magni laborum iste cum fuga corrupti iusto molestias tempore dignissimos magnam, tempora nostrum animi voluptas delectus eligendi in laboriosam porro accusamus ad. Dolorem quis molestiae facere est quod vitae ipsa odio nobis maxime minima libero commodi, omnis in corrupti mollitia molestias obcaecati amet vel aut. Eligendi ducimus assumenda debitis rem! Laboriosam, esse! Dolor deleniti omnis iste accusantium, culpa nulla enim voluptatibus nam officia recusandae. Esse facilis itaque voluptatum enim! Facilis, iure sapiente ab quam at tenetur amet laborum laboriosam. Rem neque provident labore laudantium corporis? Similique dolorem unde voluptate maxime maiores, in ipsam quasi, consequatur tempora minima modi exercitationem consectetur. Quo temporibus, eos labore consequuntur modi ipsa, quaerat quis aut odit ducimus cum. Eos deserunt, recusandae, aut odio et at velit nostrum quasi obcaecati quia asperiores dolorem rerum! Reprehenderit, mollitia non voluptatibus saepe dicta dolorum maiores nostrum praesentium omnis dolor aperiam eius ab voluptatum vel laboriosam delectus consequuntur dolore quidem ullam? Voluptas tenetur dolore distinctio doloremque neque voluptatibus nam amet! Aliquid omnis doloribus tempore delectus, quas odio ratione necessitatibus nisi, corporis maiores repellendus praesentium dicta exercitationem voluptatem inventore impedit aliquam consequatur ullam numquam nulla vel. Temporibus debitis quasi sint animi harum optio rem cum velit neque dolorum sit quas rerum, nisi sapiente consequuntur provident, totam saepe esse doloribus explicabo enim? Ad perspiciatis quibusdam ab blanditiis praesentium sit officia tempore iste amet! Qui quasi ratione nisi incidunt minus veritatis reprehenderit modi vero nulla iure quae sunt voluptatibus dolore error quas quibusdam, consectetur explicabo odit accusamus. Asperiores iure velit modi eum eius, tempore, facere nostrum reprehenderit voluptates nemo deserunt. Eos autem nulla enim iure? Quibusdam rem cumque, pariatur eligendi quia autem accusamus id veniam quaerat facilis accusantium quos! Voluptates cum laboriosam voluptas ad deserunt fuga, quia ex alias ratione vitae accusamus asperiores officiis iste at voluptatibus quae praesentium quis nihil nemo accusantium deleniti. Fuga libero quaerat, inventore quae minus saepe animi, laborum debitis unde maxime, adipisci ducimus nulla officia ipsam accusamus! Asperiores atque distinctio pariatur autem nihil quas consequatur! Harum dolorum cumque mollitia atque quisquam quod possimus adipisci corrupti quis veritatis, rem illo eveniet quae? Sunt similique hic adipisci recusandae repudiandae dolores saepe impedit.</p>
    </>
    );
}

export default Home;