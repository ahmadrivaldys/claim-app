import { AppLayout, AutoComplete, Button, Card, Input, InputGroup } from 'claim-app/components'
import { useForm } from 'claim-app/utils'
import { useRouter } from 'next/router'

export default function Home()
{
    const router = useRouter()

    console.log('Router:', router.query)

    const [form, setForm] = useForm({
        name: router?.query?.name ? router?.query?.name : '',
        vehicle_no: router?.query?.vehicle_no ? router?.query?.vehicle_no : '',
        relation: router?.query?.relation ? router?.query?.relation : '',
        date: router?.query?.date ? router?.query?.date : '',
        causes: router?.query?.causes ? router?.query?.causes : ''
    })

    const [isCurrItemShown, setIsCurrItemShown] = useForm({
        relation: false,
        causes: false
    })

    const relation = [
        {
            id: 1,
            title: 'Orang Tua'
        },
        {
            id: 2,
            title: 'Anak'
        },
        {
            id: 3,
            title: 'Adik'
        },
        {
            id: 4,
            title: 'Kakak'
        },
        {
            id: 5,
            title: 'Sepupu'
        },
        {
            id: 6,
            title: 'Ipar'
        },
        {
            id: 7,
            title: 'Teman'
        },
        {
            id: 8,
            title: 'Lain-Lain'
        }
    ]

    const causes = [
        {
            id: 1,
            title: 'Mengantuk'
        },
        {
            id: 2,
            title: 'Tidak fokus'
        },
        {
            id: 3,
            title: 'Lain-Lain'
        },
    ]

    const goNextHandler = e =>
    {
        e.preventDefault()
    
        router.push({
            pathname: '/image-upload',
            query:
            {
                form: JSON.stringify(form)
            }
        }, '/image-upload')
    }

    return (
        <AppLayout pageTitle="Registrasi Klaim">
            <Card>
                <form onSubmit={goNextHandler}>
                    <InputGroup bottomSpace={20}>
                        <Input
                            type="text"
                            placeholder="Masukkan nama pengemudi"
                            value={form.name}
                            onChange={event => setForm('name', event.target.value)}
                        />
                    </InputGroup>
                    <InputGroup bottomSpace={20}>
                        <Input
                            type="text"
                            placeholder="Nomor Kendaraan"
                            value={form.vehicle_no}
                            onChange={event => setForm('vehicle_no', event.target.value)}
                        />
                    </InputGroup>
                    <InputGroup bottomSpace={20}>
                        <AutoComplete
                            suggestions={relation}
                            suggestionObjectKey="title"
                            placeholder="Hubungan dengan tertanggung (Ketik beberapa huruf dan harap pilih dari saran yang muncul)"
                            defaultValue={form.relation}
                            onSelect={value =>
                            {
                                if(value === 'Lain-Lain')
                                {
                                    setForm('relation', '')
                                    setIsCurrItemShown('relation', true)
                                }
                                else
                                {
                                    setForm('relation', value)
                                    setIsCurrItemShown('relation', false)
                                }
                            }}
                            emptyDataMessage="Tidak ada data yang sesuai."
                        />
                    </InputGroup>
                    {isCurrItemShown.relation && (
                        <InputGroup bottomSpace={20}>
                            <Input
                                type="text"
                                placeholder="Lain-Lain: Silakan isi hubungan dengan tertanggung"
                                value={form.relation}
                                onChange={event => setForm('relation', event.target.value)}
                            />
                        </InputGroup>
                    )}
                    <InputGroup bottomSpace={20}>
                        <Input
                            type="date"
                            placeholder="Tanggal dan waktu kejadian"
                            value={form.date}
                            onChange={event => setForm('date', event.target.value)}
                        />
                    </InputGroup>
                    <InputGroup bottomSpace={isCurrItemShown.causes ? 20 : 35}>
                        <AutoComplete
                            suggestions={causes}
                            suggestionObjectKey="title"
                            placeholder="Silakan isi penyebab (Ketik beberapa huruf dan harap pilih dari saran yang muncul)"
                            defaultValue={form.causes}
                            onSelect={value =>
                            {
                                if(value === 'Lain-Lain')
                                {
                                    setForm('causes', '')
                                    setIsCurrItemShown('causes', true)
                                }
                                else
                                {
                                    setForm('causes', value)
                                    setIsCurrItemShown('causes', false)
                                }
                            }}
                            emptyDataMessage="Tidak ada data yang sesuai."
                        />
                    </InputGroup>
                    {isCurrItemShown.causes && (
                        <InputGroup bottomSpace={35}>
                            <Input
                                type="text"
                                placeholder="Lain-Lain: Silakan isi penyebab"
                                value={form.causes}
                                onChange={event => setForm('causes', event.target.value)}
                            />
                        </InputGroup>
                    )}

                    <Button type="submit">
                        Selanjutnya
                    </Button>
                </form>
            </Card>
        </AppLayout>
    )
}