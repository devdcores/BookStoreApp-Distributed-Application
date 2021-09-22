import React, { useRef, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProductsAction } from '../actions/productActions';
import useEffectDidMount from '../hooks/useEffectDidMount';
import { initialStateSorting } from '../reducers/productReducers';

export const SortingCatalog = () => {

    const elRef = useRef();
    const dispatch = useDispatch();
    const searchText = useSelector(state => state.productList.searchText);
    const filters = useSelector(state => state.productList.filters);

    const sortCriteria = {
        relevance: 'description,ASC',
        lowestPriceFirst: 'price,ASC',
        highestPriceFirst: 'price,DESC'
    };
    const [criteriaSelected, setCriteriaSelected] = useState(filters.sort)

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(listProductsAction(0, searchText, {...filters, sort: criteriaSelected}));
    };

    const handleSelectChange = (e) => {
        setCriteriaSelected(e.target.value);
    };

    useEffectDidMount(() => {
        elRef.current.click();
    }, [criteriaSelected]);

    return (
        <>
            <form onSubmit={handleSubmit} className="mt-3">                
                <h6>Sorting</h6>

                <select
                    id="dropdown-basic-button"
                    className="form-control"
                    title="Sort by"
                    onChange={handleSelectChange}
                    value={criteriaSelected}
                >
                    <option value={sortCriteria.relevance}>Relevance</option>
                    <option value={sortCriteria.lowestPriceFirst}>Lowest Price</option>
                    <option value={sortCriteria.highestPriceFirst}>Highest Price</option>
                </select>

                <button
                    type="submit"
                    ref={elRef}
                    className="btn btn-primary d-none"
                >
                    submit
                </button>
            </form>
        </>
    )
}
