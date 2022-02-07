import { useState, VFC } from "react";
import { useSelector } from "react-redux";

import right from '../../assests/right.svg';
import left from '../../assests/left.svg';
import { AppStoreType } from '../../redux/store';
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

type PaginatorProps = {
    currentPage: number;
    onChangePage: (page: number) => void
}

const useStyles = makeStyles({
    paginator: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30px',
    },

    pages: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0px 20px',
    },

    page: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '15px',
        width: '40px',
        height: '40px',

        '&:hover': {
            backgroundColor: '#fff',
            borderRadius: '100%',
            cursor: 'pointer',
        }
    },

    activePage: {
        color: '#fff',
        backgroundColor: '#5181B8',
        borderRadius: '100%',

        '&:hover': {
            color: '#fff',
            backgroundColor: '#5181B8',
            borderRadius: '100%',
        }
    },

    rightArrow: {
        '&:hover': {
            cursor: 'pointer',
        }
    },

    leftArrow: {
        '&:hover': {
            cursor: 'pointer',
        }
    },
});

export const Paginator: VFC<PaginatorProps> = ({ currentPage, onChangePage }) => {
    const { totalPage } = useSelector(({ users }: AppStoreType) => users)
    const classes = useStyles();

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
        <div className={classes.paginator}>
            {leftPortionPageNumber > 1 && <div 
                onClick={() => setPortionNumber(portionNumber - 1)} 
                className={classes.rightArrow}>
                    <img src={right} alt="right" />
                </div>
            }

            <div className={classes.pages}>
                {pages
                    .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                    .map(page => {
                        return (
                            <div key={page}
                                 onClick={() => onChangePage(page)} 
                                 className={currentPage === page ? clsx(classes.page, classes.activePage) : classes.page}>
                                {page}
                            </div>
                        )
                    } 
                    )
                }
            </div>
            {portionNumber !== numberOfPortion && 
                <div onClick={() => setPortionNumber(portionNumber + 1)} className={classes.leftArrow}>
                    <img src={left} alt="left" />
                </div>
            }
        </div>
    )
};
