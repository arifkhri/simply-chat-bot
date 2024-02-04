"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"

import useLocalData from "@/hooks/useLocalData"

import Criteria from "./Criteria"
import { IConfigForm } from "../../global"


const formSchema = z.object({
  message: z.string().min(1, "Field wajib diisi"),
  criteriaInput: z.string(),
  criteria: z.array(z.string()).min(1, "Masukan minimal 1 kriteria"),
});

interface ConfigFormProps {
  index?: number;
  afterSubmit: () => void;
  defaultValues?: IConfigForm;
}

const ConfigForm = ({ afterSubmit, defaultValues, index }: ConfigFormProps) => {
  const { store, dispatch } = useLocalData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      criteria: [],
      criteriaInput: '',
      message: ''
    },
  });
  const criteria = form.watch('criteria');

  const onKeyPressCriteria = (e) => {
    if (e.key === 'Enter') {
      const value = e.target.value;
      form.setValue('criteria', [...criteria, value]);
      form.trigger('criteria');
      form.setValue('criteriaInput', '');
      e.preventDefault();
    }
  }

  const onRemoveCriteria = (index) => {
    let newCriteria = [...criteria];
    newCriteria.splice(index, 1);
    form.setValue('criteria', newCriteria);
    form.trigger('criteria');
  }

  async function onSubmit(formValues) {
    const { message, criteria } = formValues;
    const chatBotData = store.configData.chatBotData

    if(index !== undefined) {
      chatBotData[index] = {
        message,
        criteria,
      };

    } else {
      chatBotData.push({
        message,
        criteria,
      });
    }

    dispatch({
      type: 'update',
      name: 'configData',
      value: {
        ...store.configData,
        chatBotData
      }
    });
    afterSubmit();
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Pesan Bot*</FormLabel>
                <FormControl>
                  <Textarea {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormField
              control={form.control}
              name="criteriaInput"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    <span className="mr-1">Keyword untuk pesan*</span> <br />
                    <span className="font-light text-xs text-gray-500">Masukan minimal 1 kriteria</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Tekan enter untuk menyimpan keyword" onKeyPress={onKeyPressCriteria} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="criteria"
              render={() => (
                <FormItem>
                  {/* <FormControl>
                    <Input {...field} type="text" className="hidden" />
                  </FormControl> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 mt-2">
              {
                criteria.map((value, index) => (
                  <Criteria onRemove={() => onRemoveCriteria(index)} index={index} key={`${value}`} label={value} />
                ))
              }
            </div>

          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button className="mt-3 md:mt-0" variant="outline" type="button" onClick={() => afterSubmit()}>Batal</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </Form>

    </div>
  )
}

export default ConfigForm;
