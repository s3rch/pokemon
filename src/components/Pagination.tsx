
interface Props {
  goToPrevPage: () => void;
  hasPrevPage: boolean;
  goToNextPage: () => void;
  hasNextPage: boolean;
  page: number;
}

const Pagination = ({goToPrevPage, hasPrevPage, goToNextPage, hasNextPage, page}: Props) => {
  return (
    <div className="flex justify-center mt-8 mb-4 gap-4">
    <button
      onClick={goToPrevPage}
      disabled={!hasPrevPage}
      className={`px-4 py-2 rounded ${!hasPrevPage
        ? 'bg-gray-300 cursor-not-allowed'
        : 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'}`
      }
    >
      Anterior
    </button>

    {hasPrevPage && (
      <button
        onClick={goToPrevPage}
        disabled={!hasPrevPage}
        className={`px-4 py-2 rounded ${!hasPrevPage
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'}`
        }
      >
        {page - 1}
      </button>
    )}

    <span className="flex items-center">Página {page}</span>

    {hasNextPage && (
      <button
        onClick={goToNextPage}
        disabled={!hasNextPage}
        className={`px-4 py-2 rounded ${!hasNextPage
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'}`
        }
      >
        {page + 1}
      </button>
    )}

    <button
      onClick={goToNextPage}
      disabled={!hasNextPage}
      className={`px-4 py-2 rounded ${!hasNextPage
        ? 'bg-gray-300 cursor-not-allowed'
        : 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'}`
      }
    >
      Siguiente
    </button>
  </div>
  )
}

export default Pagination;
