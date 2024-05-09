import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../slicer/slicer_modal";
import { useMutation } from "react-query";
import { deleteProduk } from "../api/produk/produk_query";
import { toast } from "react-hot-toast";
import { deleteHampers } from "../api/hampers/hampers_query";
import { deletePengadaanBahanBaku } from "../api/pengadaan_bahan_baku/pengadaan_bahan_baku_query";
import { deleteBahanBaku } from "../api/bahan_baku/bahan_baku_query";
import { deletePenitip } from "../api/penitip/penitip_query";
import { deletePengeluaran } from "../api/pengeluaran/pengeluaran_query";

function Modal_Delete() {
  const dispatch = useDispatch();
  const stateModal = useSelector((state) => state.modal);
  const key = useSelector((state) => state.modal.Key);
  const setOpen = (isOpen) => dispatch(setModal(isOpen));
  const Item = useSelector((state) => state.modal.item);
  const mutation = useMutation(deleteProduk);
  const mutateHampers = useMutation(deleteHampers);
  const mutateBahan = useMutation(deleteBahanBaku);
  const mutatePenitip = useMutation(deletePenitip);
  const mutatePengeluaran = useMutation(deletePengeluaran);
  const MutatePengadaan = useMutation(deletePengadaanBahanBaku);

  const NameofProduk = (key) => {
    if (key == "produk") {
      return Item.Nama_Produk;
    }
    if (key == "hampers") {
      return Item.Nama_Hampers;
    }
    if (key == "pengadaan_bahan_baku") {
      return Item.BahanBaku_Nama;
    }

    if (key == "bahan_baku"){
      return Item.Nama;
    }

    if (key == "penitip"){
      return Item.Nama_Penitip;
    }

    if (key == "pengeluaran"){
      return Item.Nama_Pengeluaran;
    }
  };

  const deleteProdukFunc = (id) => {
    if (key == "produk") {
      mutation.mutate(id, {
        onSuccess: (res) => {
          console.log(res);
          toast.success("Produk berhasil dihapus");
          window.location.reload(true);
        },
        onError: (err) => {
          console.log(err);
        },
      });
    }

    if (key == "hampers") {
      mutateHampers.mutate(id, {
        onSuccess: (res) => {
          console.log(res);
          toast.success("Hampers berhasil dihapus");
          window.location.reload(true);
        },
        onError: (err) => {
          console.log(err);
        },
      });
    }

    if (key == "bahan_baku") {
      mutateBahan.mutate(id, {
        onSuccess: (res) => {
          console.log(res);
          toast.success("Bahan Baku berhasil dihapus");
          window.location.reload(true);
        },
        onError: (err) => {
          console.log(err);
        },
      });
    }

    if (key == "pengadaan_bahan_baku") {
      MutatePengadaan.mutate(id, {
        onSuccess: (res) => {
          console.log(res);
          toast.success("Pengadaan Bahan Baku berhasil dihapus");
          window.location.reload(true);
        },
        onError: (err) => {
          console.log(err);
        },
      });
    }

    if (key == "penitip") {
      mutatePenitip.mutate(id, {
        onSuccess: (res) => {
          console.log(res);
          toast.success("Penitip berhasil dihapus");
          window.location.reload(true);
        },
        onError: (err) => {
          console.log(err);
        },
      });
    }

    if (key == "pengeluaran") {
      mutatePengeluaran.mutate(id, {
        onSuccess: (res) => {
          console.log(res);
          toast.success("Pengeluaran berhasil dihapus");
          window.location.reload(true);
        },
        onError: (err) => {
          console.log(err);
        },
      });
    }

  };

  if (stateModal.isOpen) {
    document.getElementById("my_modal_3").showModal();
  }

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Konfirmasi</h3>
        <p className="py-4">
          Apakah Anda yakin akan menghapus <b>{NameofProduk(key)}</b> ?
        </p>

        <div className="flex justify-end">
          <button
            className="btn btn-primary text-base-100"
            style={{ width: "5rem" }}
            onClick={() => deleteProdukFunc(Item.Id)}
          >
            {mutation.isLoading || mutateHampers.isLoading || MutatePengadaan.isLoading || mutateBahan.isLoading ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              "Ya"
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default Modal_Delete;
