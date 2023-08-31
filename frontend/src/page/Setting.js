import React from 'react'
import { DefaultButton } from '@fluentui/react/lib/Button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TextField, Button } from '@fluentui/react';

const Setting = () => {

    const onDragEnd = () => {
    }
    return (
        <div
            className='h-screen w-screen flex'
        >
            <div className='flex-none h-full w-1/5 bg-slate-200 '>
                <div className='p-2 border-black border-b w-full font-bold'>
                    Components
                </div>
                <div className='p-2 grid grid-cols-2 gap-2'>
                    <DefaultButton text='number' iconProps={{ 'iconName': 'NumberField' }} className='bg-white text-base h-12' />
                    <DefaultButton text='Date Time' iconProps={{ 'iconName': 'DateTime' }} className='bg-white  text-base h-12' />
                    <DefaultButton text='Text Field' iconProps={{ 'iconName': 'TextField' }} className='bg-white  text-base h-12' />
                </div>
            </div>
            <div className='flex-grow p-8'>
                <div>
                    <h1 className='text-xl font-bold mb-4'>Form Setting</h1>
                    <p className='font-bold'>Standard Field</p>
                    <TextField
                        label='title'
                        readOnly />
                    <TextField
                        label='description'
                        readOnly />
                    <p className='font-bold mt-4'>Optional Field</p>
                    {/* fill with the optional form */}

                </div>
            </div>
        </div>
    )
}

export default Setting