import { ChatBubbleIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import Head from "next/head";
import { useRouter } from 'next/navigation'
import { useState } from 'react';

import ConfigForm from '@/components/ConfigForm';
import Criteria from '@/components/Criteria';
import Schema from '@/components/Schema';
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

import { siteConfig } from "@/constant/config";
import { botStore } from '@/lib/zustand/stores/botStore';

import { IModal } from '../../../global';

const ConfigPage = () => {
  const { messageData, set: setChatData } = botStore();
  const [modal, setModal] = useState<IModal>(null);

  const { push: navigate } = useRouter();

  const simulateChat = () => {
    navigate('/');
  }

  const showFormModal = (record?) => {
    let modalData = {
      title: 'Tambah Pesan Bot',
      open: true,
      content: <ConfigForm afterSubmit={() => {
        setModal({ open: false })
      }} />
    };

    if (record) {
      modalData = {
        title: 'Ubah Pesan Bot',
        open: true,
        content: <ConfigForm defaultValues={record} afterSubmit={() => {
          setModal({ open: false })
        }} />
      }
    }
    setModal(modalData)
  }

  const showSchemaModal = () => {
    setModal({
      title: 'Skema Pesan Bot',
      open: true,
      content: <Schema onOk={() => {
        setModal({ open: false })
      }} data={messageData} />
    })
  }

  const deleteChat = (index) => {
    const newData = [...messageData];
    newData.splice(index, 1);
    setChatData(newData);
  }

  return (
    <>
      <Head>
        <title>Config - {siteConfig.title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="h-full relative pt-6 px-2 pb-16 lg:grid lg:max-w-7xl lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:pb-24 lg:pt-16">
        {/* header */}
        <div className="w-full flex justify-between items-center mb-10">
          <div>
            <h3 className="text-2xl font-medium">Konfigurasi Pesan Bot</h3>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="border-gray-800 border-2" onClick={() => showSchemaModal()}>
              Skema Pesan
            </Button>
            <Button onClick={() => showFormModal()}>
              Tambah
            </Button>
          </div>
        </div>

        {/* content */}
        <div className="pt-5">
          {
            messageData.length > 0 ? (
              <div className="flex flex-col justify-center">
                {
                  messageData.map((data, index) => (
                    <div key={index} className="flex-col border mb-5 hover:bg-slate-50 rounded p-3">
                      <div className="flex justify-end">
                        <Button className="mx-2 w-6 h-6" variant="secondary" size="icon" onClick={() => showFormModal(data)}>
                          <Pencil1Icon />
                        </Button>
                        <Button onClick={() => deleteChat(index)} size="icon" variant="secondary" className="w-6 h-6">
                          <TrashIcon />
                        </Button>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-bold">Pesan Bot : </span>

                        <p className="font-light" style={{ whiteSpace: 'pre-line' }}>
                          {data.message}
                        </p>
                      </div>
                      <div className="flex mt-3">
                        <span className="text-base font-bold">Kriteria : </span>
                        <div className="flex ml-3">
                          {
                            data.criteria.map((value) => (
                              <Criteria className="mr-2" index={index} key={`${value}`} label={value} />
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  ))
                }

                <Button variant="secondary" className="border-gray-800 border-2" onClick={simulateChat}>
                  <span className="mr-2">Mulai Simulasi Chat</span>  <ChatBubbleIcon />
                </Button>
              </div>
            ) : (
              <div className="flex-col border rounded p-3">
                <p className="text-center" style={{ whiteSpace: 'pre-line' }}>
                  Belum ada data
                </p>
              </div>
            )
          }
        </div>
        
        <Dialog open={modal?.open}>
          <DialogContent className="w-full md:max-w-2lg">
            <DialogHeader>
              <DialogTitle>{modal?.title}</DialogTitle>
              <DialogDescription>
                <div className="mt-5">
                  {modal?.content}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}


export default ConfigPage;
