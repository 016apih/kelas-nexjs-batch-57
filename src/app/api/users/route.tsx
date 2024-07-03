import moment from "moment";
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
   const users = await prisma.users.findMany();
   console.log(moment().format('DD-MM-YYYY HH:mm:ss:SSS'), " GET - USERS", users)
	return NextResponse.json({ data: users });
}

export async function POST(req: NextRequest) {
	const body = await req.json();

   console.log(moment().format('DD-MM-YYYY HH:mm:ss:SSS'), " ADD - USER", body)

   let { email, password, fullname, role } = body;

   const newUser = await prisma.users.create({
      data: { email, password, fullname, role, }
   });
   
   return NextResponse.json({ rc: "00", msg: "Data berhasil di tambahkan", data: newUser });

}

export async function PUT(req: NextRequest) {
	const qParams: any = req.nextUrl.searchParams;
	const id = qParams.get('id');
	const body = await req.json();

   console.log(moment().format('DD-MM-YYYY HH:mm:ss:SSS'), " EDIT - USER", body)
   let { email, password, fullname, role } = body;

	const newUser = await prisma.users.update({
		data: { email, password, fullname, role },
		where: { id: Number(id) }
	});
	
	return NextResponse.json({ rc: "00", msg: "Data berhasil di update", data: newUser });
} 


export async function DELETE(req: NextRequest) {
	const qParams: any = req.nextUrl.searchParams;
	const id = qParams.get('id');

	if(id){
		const user = await prisma.users.delete({
			where: { id: Number(id) }
		});
		
		console.log(moment().format('DD-MM-YYYY HH:mm:ss:SSS'), " DELETE - USER ", user)

		return NextResponse.json({ rc: "00", msg: "Data berhasil di hapus"});
	}

	return NextResponse.json({ rc: "00", msg: "Data gagal di hapus"});
}
