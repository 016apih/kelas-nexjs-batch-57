import moment from "moment";
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
	const qParams: any = req.nextUrl.searchParams;
	const id = qParams.get('userId');
   const todos = await prisma.todos.findMany({
		where: { userId: id ? Number(id) : undefined }
	});
	
	console.log(moment().format('DD-MM-YYYY HH:mm:ss:SSS'), " GET - TODOS", todos)

	return NextResponse.json({ data: todos, rc: "00" });
}

export async function POST(req: NextRequest) {
	const body = await req.json();

   let { title, completed, userId } = body;
   const newTodo = await prisma.todos.create({
      data: { title, completed: completed || false, userId, }
   });

   console.log(moment().format('DD-MM-YYYY HH:mm:ss:SSS'), " ADD - TODO", body)
   
   return NextResponse.json({ rc: "00", msg: "Data berhasil di tambahkan", data: newTodo });
}

export async function PUT(req: NextRequest) {
	const qParams: any = req.nextUrl.searchParams;
	const id = qParams.get('id');
	const body = await req.json();

   let { title, completed, userId } = body;

	const newTodo = await prisma.todos.update({
		data: { title, completed: completed || false, userId },
		where: { id: Number(id) }
	});

   console.log(moment().format('DD-MM-YYYY HH:mm:ss:SSS'), " EDIT - TODO", body)
	
	return NextResponse.json({ rc: "00", msg: "Data berhasil di update", data: newTodo });
} 


export async function DELETE(req: NextRequest) {
	const qParams: any = req.nextUrl.searchParams;
	const id = qParams.get('id');

	if(id){
		const todo = await prisma.todos.delete({
			where: { id: Number(id) }
		});
		
		console.log(moment().format('DD-MM-YYYY HH:mm:ss:SSS'), " DELETE - TODO ", todo)

		return NextResponse.json({ rc: "00", msg: "Data berhasil di hapus"});
	}

	return NextResponse.json({ rc: "00", msg: "Data gagal di hapus"});
}
