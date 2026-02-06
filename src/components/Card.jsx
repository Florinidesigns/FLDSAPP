import React from "react";
import { useNavigate } from "react-router-dom";
import {
    BarChart3,
    ShoppingBag,
    Users,
    Package,
    Truck,
    Layers,
    LineChart,
    FileLineChart,
    Package2,
    BadgeQuestionMark
} from 'lucide-react';

function Card() {
    const navigate = useNavigate();


    return (
        <div className="card flex flex-row h-[100%] w-[100%] justify-center items-center bg-white flex-wrap ">
            {/* DASHBOARDS GENÉRICO - SEMPRE VISÍVEL */}
            <div className="flex flex-col h-[50%] w-[25%] bg-white shadow-lg dash items-center justify-center border-none rounded-2xl">
                <div className="h-[20%] w-[100%] text-slate-800 bg-amber-400 border-none top-0 filter grayscale-[50%] rounded-t-2xl">
                    <p className="h-[100%] w-[100%] text-center text-white text-lg place-content-evenly rounded-t-2xl border-none">DASHBOARDS GENÉRICO</p>
                </div>

                <div className="h-[70%] w-[100%] flex flex-col bg-white border-none">
                    <div className="flex flex-row h-[25%] w-full justify-center items-center cursor-pointer text-2xl text-black border-none">
                        <div
                            onClick={() => navigate("/visaogeral")}
                            className="text-sm w-[92%] h-[80%] bg-amber-500 grayscale-[10%] text-white hover:bg-slate-500 m-1 rounded-lg flex justify-center items-center"
                        >
                            <BarChart3 size={20} />&nbsp;VISÃO GERAL
                        </div>

                    </div>

                    <div className="flex flex-row h-[25%] w-full justify-center items-center cursor-pointer text-2xl text-black border-none">
                        <div
                            onClick={() => navigate("/vendas")}
                            className="text-sm w-[45%] h-[80%] bg-amber-500 grayscale-[10%] text-white hover:bg-slate-500 m-1 rounded-lg flex justify-center items-center"
                        >
                            <Package2 size={20} />&nbsp;VENDAS
                        </div>

                        <div
                            onClick={() => navigate("/compras")}
                            className="text-sm w-[45%] h-[80%] bg-amber-500 grayscale-[10%] text-white hover:bg-slate-500 m-1 rounded-lg flex justify-center items-center"
                        >
                            <Package size={20} />&nbsp;COMPRAS
                        </div>
                    </div>

                    <div className="flex flex-row h-[25%] w-full justify-center items-center cursor-pointer text-2xl text-black border-none">
                        <div
                            onClick={() => navigate("/clientes")}
                            className="text-sm w-[45%] h-[80%] bg-amber-500 grayscale-[10%] text-white hover:bg-slate-500 m-1 rounded-lg flex justify-center items-center"
                        >
                            <Users size={20} />&nbsp;CLIENTES
                        </div>
                        <div
                            onClick={() => navigate("/fornecedores")}
                            className="text-[12px] w-[45%] h-[80%] bg-amber-500 grayscale-[10%] text-white hover:bg-slate-500 m-1 rounded-lg flex justify-center items-center"
                        >
                            <Truck size={20} />&nbsp;FORNECEDORES
                        </div>

                    </div>

                    <div className="flex flex-row h-[25%] w-full justify-center items-center cursor-pointer text-2xl text-black border-none">
                        <div
                            onClick={() => navigate("/artigos")}
                            className="text-[12px] w-[45%] h-[80%] bg-amber-500 grayscale-[10%] text-white hover:bg-slate-500 m-1 rounded-lg flex justify-center items-center"
                        >
                            <ShoppingBag size={20} />&nbsp;ARTIGOS&STOCKS
                        </div>
                        <div
                            onClick={() => navigate("/rentabilidade")}
                            className="text-[12px] w-[45%] h-[80%] bg-amber-500 grayscale-[10%] text-white hover:bg-slate-500 m-1 rounded-lg flex justify-center items-center"
                        >
                            <LineChart size={20} />&nbsp;RENTABILIDADE
                        </div>
                    </div>
                </div>
                <div className="h-[10%] w-[100%] text-slate-800 bg-amber-400 rounded-b-2xl bottom-0 filter grayscale-[50%] border-none"></div>
            </div>

            {/* DASHBOARDS MODULAR - SEMPRE VISÍVEL */}
            <div className="flex flex-col h-[50%] w-[25%] mx-4 border-none shadow-lg dashmod items-center justify-center bg-white rounded-2xl">
                <div className="h-[20%] w-[100%] text-slate-800 bg-emerald-500 top-0 filter grayscale-[50%] rounded-t-2xl border-none">
                    <p className="h-[100%] w-[100%] text-center text-white text-lg place-content-evenly rounded-t-2xl border-none">DASHBOARDS MODULAR</p>
                </div>
                <div className="h-[70%] w-[100%] bg-white border-none">
                    <div className="h-[70%] w-[100%] flex flex-col border-none bg-white">
                        <div className="flex flex-row h-[25%] w-full justify-center items-center cursor-pointer text-2xl text-black border-none">
                            <div
                                onClick={() => handleButtonClick("dashmod", "teste")}
                                className="text-sm w-[70%] h-[80%] bg-emerald-500 grayscale-[10%] text-white hover:bg-slate-500 m-1 rounded-lg flex justify-center items-center"
                            >
                                <BadgeQuestionMark size={20} />&nbsp;SEM MODULARES
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[10%] w-[100%] text-slate-800 bg-emerald-500 rounded-b-2xl bottom-0 filter grayscale-[50%] border-none"></div>
            </div>

            {/* DASHBOARDS TAILORED - SEMPRE VISÍVEL */}
            <div className="flex flex-col h-[50%] w-[25%] shadow-lg dashtail items-center justify-center bg-white border-none rounded-2xl">
                <div className="h-[20%] w-[100%] text-slate-800 bg-blue-400 top-0 filter grayscale-[50%] rounded-t-2xl border-none">
                    <p className="h-[100%] w-[100%] text-center text-white text-lg place-content-evenly rounded-t-2xl border-none">DASHBOARDS TAILORED</p>
                </div>
                <div className="h-[70%] w-[100%] bg-white border-none">
                    <div className="h-[70%] w-[100%] flex flex-col border-none bg-white">
                        <div className="flex flex-row h-[25%] w-full justify-center items-center cursor-pointer text-2xl text-black border-none">
                            <div
                                onClick={() => handleButtonClick("dashtail")}
                                className="text-sm w-[70%] h-[80%] bg-blue-500 grayscale-[10%] text-white hover:bg-slate-500 m-1 rounded-lg flex justify-center items-center"
                            >
                                <BadgeQuestionMark size={20} />&nbsp;SEM TAILORED
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[10%] w-[100%] text-slate-800 bg-blue-400 rounded-b-2xl bottom-0 filter grayscale-[50%] border-none"></div>
            </div>
        </div>
    );
}

export default Card;
