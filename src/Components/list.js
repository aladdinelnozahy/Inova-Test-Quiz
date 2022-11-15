import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './list.css';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';


const List = () => {
    const [products, setProducts] = useState([]);
    var [pageStart, setPageStart] = useState(1);
    useEffect(() => {
        axios
            .get(`https://staging.algym.com/api/v1/gyms?lat=31.2475504&long=29.963676&page_number=${pageStart}&page_size=10&search_diameter=1000`,
            {params:{page:pageStart}})
            // .get("https://fakestoreapi.com/products")
            .then((res) => {
                // console.log(res.data.data);
                setProducts(res.data.data);
            }).catch((err) => {
                console.log(err);

            });
    }, [pageStart])


    function prev() {
        if (pageStart > 1) {
            setPageStart(--pageStart);

        }
    }
    function next() {
        setPageStart(++pageStart);

    }
    return (
        <>
            <button className="btn btn-group bg-warning text-dark  " onClick={(

            ) => prev()} >Previous</button>

            <button className="btn btn-group bg-success text-light" onClick={() => next()} >Next</button>
            <p>Page Number: {pageStart}</p>
            
            
            <div className="grid-list shadow p-2 m-2">
                {products.map((gym) => {
                    return (

                        <Card className='styl' key={gym.id} style={{ width: '18rem' }}>
                            <Card.Img className='imgtest' variant="top" src={gym.logo_img_url} />
                            <Card.Body>
                                <Card.Title className='namestyle'>{gym.name}</Card.Title>
                                <Card.Text>
                                    {gym.address}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    )
                })}
            </div>

        </>


    );
}

export default List;




