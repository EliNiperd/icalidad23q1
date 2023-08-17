import swr from 'swr';

const Catalogo = () => {
  const { data, error, status } = swr('/api/managment/getManagment?GET');
  if (error) console.log('Error: ', error);
  //  console.log('Managments: ', data, status, error);
  return (
    <>
      {!data && status === 'loading' ? (
        <p className="text-secondary">Cargando datos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
          {data?.recordset.map((Managment, index) => (
            <>
              <div className="pt-10 rounded-lg outline outline-2  outline-slate-200 p-5 pb-10 overflow-hidden shadow-lg ">
                <header key={index} className="">
                  <h3 className="text-2xl font-semibold border-b border-spacing-2">
                    {Managment.ClaveGerencia}
                  </h3>
                </header>
                <main>
                  <section>
                    <p className="text-xl text-gray-900 ">
                      {Managment.NombreGerencia}
                    </p>
                  </section>
                </main>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default Catalogo;
