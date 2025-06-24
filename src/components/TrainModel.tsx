'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import axios from 'axios';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ImageIcon, Upload, X } from 'lucide-react';
import JSZip from 'jszip';
import { toast } from 'sonner';
import {
  ETHINICITY,
  EYECOLOR,
  TrainModelInput,
  TYPE,
} from '@/types/trainmodel-types';
import { Alert, AlertDescription } from './ui/alert';
import { getPresignedUrlAction, trainModel } from '@/actions/models';

export interface FileWithPreview {
  file: File;
  preview: string;
  id: string;
}

export type TrainModelFormValues = z.infer<typeof TrainModelInput>;

const Page = () => {
  const form = useForm<TrainModelFormValues>({
    resolver: zodResolver(TrainModelInput),
    defaultValues: {
      name: '',
      age: 0,
      type: undefined,
      ethinicity: undefined,
      eyeColor: undefined,
      bald: false,
      zipUrl: '',
    },
  });

  const handleFileSubmit = async (files: FileWithPreview[]) => {
    try {
      const { modelkey, url } = await getPresignedUrlAction();
      const zip = new JSZip();
      if (files.length !== 0) {
        for (const fileObj of files) {
          const content = await fileObj.file.arrayBuffer();
          zip.file(fileObj.file.name, content);
        }
        const content = await zip.generateAsync({ type: 'blob' });
        const formData = new FormData();
        formData.append('file', content);
        const { data } = await axios.put(url, content);
        form.setValue(
          'zipUrl',
          process.env.NEXT_PUBLIC_CLOUDFLARE_BASE_URL + '/' + modelkey
        );
      }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to get upload';
        throw new Error(errorMessage);
    }
  };

  const handleSubmit = async () => {
    try {
      await handleFileSubmit(files);
    await trainModel(form.getValues());
      toast.success('Model created successfully');
    } catch (error) {
      toast.error('Failed to create model');
    }
  };

  const router = useRouter();

  const formatFileSize = (bytes: number): string => {
    return (bytes / 1024 / 1024).toFixed(2);
  };

  const removeFile = (id: string): void => {
    const newFiles = files.filter(file => file.id !== id);
    setFiles(newFiles);
  };

  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>('');
  const onButtonClick = (): void => {
    inputRef.current?.click();
  };
  const loading = form.formState.isSubmitting;
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const maxFiles = 10;
  const maxSize = 5 * 1024 * 1024;
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const handleDrag = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleFiles = (fileList: FileList): void => {
    const validFiles: FileWithPreview[] = [];

    const fileArray = Array.from(fileList);

    // Check if adding these files would exceed maxFiles
    if (files.length + fileArray.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    let processedCount = 0;

    fileArray.forEach((file: File) => {
      if (!allowedTypes.includes(file.type)) {
        setError('Only image files (JPEG, PNG, GIF, WebP) are allowed');
        return;
      }

      if (file.size > maxSize) {
        setError(
          `File size must be less than ${(maxSize / 1024 / 1024).toFixed(1)}MB`
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>): void => {
        if (e.target?.result) {
          validFiles.push({
            file,
            preview: e.target.result as string,
            id: Math.random().toString(36).substring(7),
          });

          processedCount++;
          if (processedCount === fileArray.length) {
            const newFiles = [...files, ...validFiles];
            setFiles(newFiles);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError('');

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setError('');
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="flex w-screen justify-center items-center min-h-screen py-8">
      <Card className="w-[30%] min-w-[400px]">
        <CardHeader>
          <CardTitle>Train Model</CardTitle>
          <CardDescription>Train once, and generate forever</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <CardContent className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of the model" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input placeholder="Age of the person" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TYPE.map((type, index) => (
                          <SelectItem key={index} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ethinicity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ethnicity</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ethnicity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ETHINICITY.map((ethnicity, index) => (
                          <SelectItem key={index} value={ethnicity}>
                            {ethnicity}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eyeColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eye Color</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select eye color" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {EYECOLOR.map((eyecolor, index) => (
                          <SelectItem key={index} value={eyecolor}>
                            {eyecolor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bald"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Bald</FormLabel>
                      <FormDescription>
                        Toggle if the person is bald
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Images</FormLabel>
                    <FormControl>
                      {/* <DragDropImage 
                        onChange={field.onChange}
                      /> */}
                      <div className="w-full max-w-2xl mx-auto p-6">
                        <div
                          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                            dragActive
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                        >
                          <input
                            ref={inputRef}
                            type="file"
                            multiple
                            accept={allowedTypes.join(',')}
                            onChange={handleChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />

                          <div className="flex flex-col items-center space-y-4">
                            <div
                              className={`p-4 rounded-full ${dragActive ? 'bg-blue-100' : 'bg-gray-100'}`}
                            >
                              <Upload
                                className={`w-8 h-8 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`}
                              />
                            </div>

                            <div>
                              <p className="text-lg font-medium text-gray-700">
                                {dragActive
                                  ? 'Drop your images here'
                                  : 'Drag & drop images here'}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                or{' '}
                                <button
                                  type="button"
                                  onClick={onButtonClick}
                                  className="text-blue-600 hover:text-blue-700 font-medium underline"
                                >
                                  browse files
                                </button>
                              </p>
                            </div>

                            <p className="text-xs text-gray-400">
                              Supports: JPEG, PNG, GIF, WebP (max{' '}
                              {(maxSize / 1024 / 1024).toFixed(1)}MB each,{' '}
                              {maxFiles} files max)
                            </p>
                          </div>
                        </div>
                        {error && (
                          <Alert className="mt-4 border-red-200 bg-red-50">
                            <AlertDescription className="text-red-700">
                              {error}
                            </AlertDescription>
                          </Alert>
                        )}
                        {files.length > 0 && (
                          <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                              Uploaded Images ({files.length}/{maxFiles})
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {files.map((fileObj: FileWithPreview) => (
                                <div
                                  key={fileObj.id}
                                  className="relative group"
                                >
                                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                                    <img
                                      src={fileObj.preview}
                                      alt={fileObj.file.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>

                                  {/* Remove Button */}
                                  <button
                                    onClick={() => removeFile(fileObj.id)}
                                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
                                    aria-label={`Remove ${fileObj.file.name}`}
                                  >
                                    <X className="w-4 h-4" />
                                  </button>

                                  {/* File Info */}
                                  <div className="mt-2">
                                    <p
                                      className="text-sm font-medium text-gray-700 truncate"
                                      title={fileObj.file.name}
                                    >
                                      {fileObj.file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {formatFileSize(fileObj.file.size)} MB
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {files.length === 0 && !dragActive && (
                          <div className="mt-8 text-center py-8">
                            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">
                              No images uploaded yet
                            </p>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button disabled={loading} type="submit" className="w-full">
                {loading ? 'Submitting...' : 'Submit Model'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Page;
