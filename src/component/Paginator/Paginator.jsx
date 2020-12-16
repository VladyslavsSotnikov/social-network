import React, { useState } from 'react'
import right from '../../assests/right.svg'
import left from '../../assests/left.svg'
import { useSelector } from 'react-redux'
function Paginator({ currentPage, onChangePage }) {


    const { totalPage } = useSelector(({ users }) => users)
    let pages = Array(totalPage).fill(null)
    for (let i = 0; i < pages.length; i++) {
        pages[i] = i + 1
    }
    const portionSize = 5;
    const [portionNumber, setPortionNumber] = useState(Math.ceil(currentPage / portionSize));
    const numberOfPortion = Math.ceil(totalPage / portionSize)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className="paginator">
            {leftPortionPageNumber > 1 && <div onClick={() => setPortionNumber(portionNumber - 1)} className="paginator__arrow-right"><img src={right} alt="right" /></div>}

            <div className="paginator__pages">
                {pages
                    .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                    .map(page => <div key={page} onClick={() => onChangePage(page)} className={currentPage === page ? 'paginator__page paginator__page--active' : 'paginator__page'}  >{page}</div>)}
            </div>
            {portionNumber !== numberOfPortion && <div onClick={() => setPortionNumber(portionNumber + 1)} className="paginator__arrow-left"><img src={left} alt="left" /></div>}

        </div>
    )
}

export default Paginator
