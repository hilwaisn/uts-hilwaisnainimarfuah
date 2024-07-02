import { useState, useEffect } from "react";
import { Trash, SquarePen } from "lucide-react";
import { Plus, Search, CircleAlert, Heart } from "lucide-react";

let isinepilem = [
    {
        id: 1,
        jeneng: "Habibie dan Ainun",
        poto: "https://i.pinimg.com/564x/df/ad/75/dfad7512c35b6519f8fae90780ff9df0.jpg",
        rilise: 2010,
        genre: "Pahlawan",
        suwene: "150 menit",
        sinopsis: "Film Habibie dan Ainun adalah kisah inspiratif tentang cinta sejati antara BJ Habibie dan Hasri Ainun Habibie."
    },
    {
        id: 2,
        jeneng: "Saw",
        poto: "https://i.pinimg.com/474x/48/df/d7/48dfd7d9a5e71455e2600ea91a9a0abe.jpg",
        rilise: 2004,
        genre: "Psikopat",
        suwene: "120 menit",
        sinopsis: "Film Saw menceritakan tentang seorang pembunuh jenius yang dikenal sebagai Jigsaw Killer. "
    },
    {
        id: 3,
        jeneng: "Laskar Pelangi",
        poto: "https://i.pinimg.com/564x/a8/55/9c/a8559c24d7b363f4506e334e0041649d.jpg",
        rilise: 2012,
        genre: "Persahabatan",
        suwene: "150 menit",
        sinopsis: "Laskar Pelangi adalah film drama Indonesia tahun 2008 yang disutradarai oleh Riri Riza."
    },
    {
        id: 4,
        jeneng: "Sabtu Bersama Bapak",
        poto: "https://i.pinimg.com/474x/26/03/4b/26034b6f5635242a34ab22741b4e3f49.jpg",
        rilise: 2016,
        genre: "Keluarga",
        suwene: "150 menit",
        sinopsis: "Sabtu Bersama Bapak berkisah tentang Gunawan, seorang ayah yang tinggal bersama anak-anaknya."
    },
];

const nyimpenPilem = localStorage.getItem("pilemm");

export default function Film() {
    const [pilemm, setpilemm] = useState(
        nyimpenPilem ? JSON.parse(nyimpenPilem) : isinepilem
    );
    const info = (pilem) => {
        alert(`Judul: ${pilem.jeneng}\nGenre: ${pilem.genre}\nDurasi: ${pilem.suwene}\nSinopsis Film: ${pilem.sinopsis}`);
    };

    const [updatePilem, setUpdatePilem] = useState(null);
    const [addPilem, setAddPilem] = useState(null);
    const [orderBy, setOrderBy] = useState("asc"); 
    const [sortByGenre, setSortByGenre] = useState("id"); 
    const [sortByData, setSortByData] = useState("id");
        const [search, setSearch] = useState("");
    const nyaringData = pilemm
    .filter((item) => {
        if (sortByGenre !== "id") {
            return item.genre === sortByGenre;
        }
        return true;
    })
    .sort((h, s) => {
        if (orderBy === "asc") {
            return h[sortByData] < s[sortByData] ? -1 : 1;
        } else {
            return h[sortByData] > s[sortByData] ? -1 : 1;
        }
    })
    .filter((item) => {
        return item.jeneng.toLowerCase().includes(search.toLowerCase());
    });

    const [heartColor, setHeartColor] = useState({});

    const handleHeartClick = (id) => {
        setHeartColor(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };
  function handleDelete(pilem) {
    if (window.confirm("Apakah kamu yakin hapus ini?")) {
      setpilemm(pilemm.filter((p) => p.id !== pilem.id));
    }
  }

  function handleUpdate() {
    setpilemm(
      pilemm.map((a) => (a.id === updatePilem.id ? updatePilem : a))
    );
    setUpdatePilem(null);
  }

  function handleAddPilem() {
    const newId =
      pilemm.length > 0 ? Math.max(...pilemm.map((p) => p.id)) + 1 : 1;
    setpilemm([...pilemm, { ...addPilem, id: newId }]);
    setAddPilem(null); //
  }

  useEffect(() => {
    localStorage.setItem("pilemm", JSON.stringify(pilemm));
  }),
    [pilemm];

  console.log(pilemm);
  return (
    <div>
      <div className="flex w-full items-center p-3">
        <div
          className="flex w-1/4 gap-2 justify-center"
          onClick={() => setAddPilem(pilemm)}>
          <Plus />
          Tambah Film
        </div>
        <div className=" flex w-2/4  p-4 gap-1">
          <Search />
          <input
            type="text"
            className="bg-gray-200 w-full p-2 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
]        <label className="flex gap-1">
                    <h1>Genre :</h1>
                    <select
                        className="border border-collapse"
                        value={sortByGenre}
                        onChange={(e) => setSortByGenre(e.target.value)}>
                        <option value="id">Semua</option>
                        {['Keluarga', 'Pahlawan', 'Persahabatan', 'Psikopat'].map(
                            (genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            )
                        )}
                    </select>
                </label>
                <label className="flex gap-1">
                    <h1>Urutkan :</h1>
                    <select
                        className="border border-collapse"
                        value={sortByData}
                        onChange={(e) => setSortByData(e.target.value)}>
                        <option value="id">Normal</option>
                        <option value="jeneng">Name Film</option>
                        <option value="rilise">Tahun Rilis</option>
                    </select>
                </label>
                <label className="flex ">
                    <h1>Urutkan :</h1>
                    <select
                        value={orderBy}
                        onChange={(e) => setOrderBy(e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>

                  <div className="flex justify-center items-center gap-6">
        {nyaringData.map((pilem) => (
          <div key={pilem.id}>
            <div>
            <p>{pilem.jeneng}</p>
            <button
                className={`flex w-1/4 gap-2 justify-center ${heartColor[pilem.id] ? 'text-red-500' : 'text-black'}`}
                onClick={() => handleHeartClick(pilem.id)}
            >
                <Heart />
            </button>
              <img
                src={pilem.poto}
                alt={pilem.name}
                className="w-40 h-40"
              />
              <p>{pilem.rilise}</p>
            </div>
            <div>
              <button onClick={() => handleDelete(pilem)}>
                <Trash />
              </button>
              <button onClick={() => setUpdatePilem(pilem)}>
                <SquarePen />
              </button>
              <button onClick={() => info(pilem)} className="btn-info">
                <CircleAlert className="icon" />
                </button>
            </div>
          </div>
        ))}
      </div>
      {updatePilem && (
        <div className="fixed inset-0 items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-3 w-1/4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <label>Name Film : </label>
              <input
                type="text"
                id="jeneng"
                value={updatePilem.jeneng}
                onChange={(e) =>
                  setUpdatePilem({ ...updatePilem, jeneng: e.target.value })
                }
                className="border border-gray-300 p-2 mb-4 w-full"
              />
              <label>Gambar Film: </label>
              <input
                type="text"
                id="poto"
                value={updatePilem.image}
                onChange={(e) =>
                  setUpdatePilem({
                    ...updatePilem,
                    image: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 mb-4 w-full"
              />
                <label>Tahun Rilis : </label>
              <input
                type="number"
                id="rilise"
                value={updatePilem.rilise}
                onChange={(e) =>
                  setUpdatePilem({
                    ...updatePilem,
                    rilise: parseInt(e.target.value),
                  })
                }
                className="border border-gray-300 p-2 mb-4 w-full"
              />
              <div className="flex gap-2 justify-center items-center">
                <button
                  className="bg-blue-200 shadow-lg p-1 hover:bg-blue-500 w-full"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="bg-blue-200 shadow-lg p-1 hover:bg-blue-500 w-full"
                  type="button"
                  onClick={() => setUpdatePilem(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {addPilem && (
        <div>
          <div className="fixed inset-0 items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white w-1/4 p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddPilem();
                }}
              >
              <label>Nama Film : </label>
              <input
                  className="border border-gray-300 p-2 mb-4 w-full"
                  type="text"
                  id="jeneng"
                  value={addPilem.jeneng}
                  onChange={(e) =>
                    setAddPilem({ ...addPilem, jeneng: e.target.value })
                  }
                />
                <label>Gambar Film : </label>
                <input
                  className="border border-gray-300 p-2 mb-4 w-full"
                  type="text"
                  id="poto"
                  value={addPilem.poto}
                  onChange={(e) =>
                    setAddPilem({
                      ...addPilem,
                      poto: e.target.value,
                    })
                  }
                />
                <label>Tahun Rilis : </label>
                <input
                  className="border border-gray-300 p-2 mb-4 w-full"
                  type="number"
                  id="rilise"
                  value={addPilem.rilise}
                  onChange={(e) =>
                    setAddPilem({
                      ...addPilem,
                      rilise: parseInt(e.target.value),
                    })
                  }
                />

                <div className="flex gap-2 justify-center items-center">
                  <button
                    className="bg-blue-200 w-full p-1 hover:bg-blue-500"
                    type="submit"
                  >
                    Save
                  </button>
                  <button
                    className="bg-blue-200 w-full p-1 hover:bg-blue-500"
                    type="button"
                    onClick={() => setAddPilem(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}