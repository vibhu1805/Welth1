import { getAccountWithTransactions } from '@/actions/account'
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import {TransactionTable} from '../_components/transaction-table.jsx';
import { BarLoader } from 'react-spinners';
import { AccountChart } from '../_components/account-chart.jsx';

const AccountsPage = async ({params}) => {
  const { id } = await params; //Ensuring params is awaited // added due to error occuring in params by ISHI, not in OG gitrepo 
  const accountData = await getAccountWithTransactions(id);
 
  if(!accountData){
    notFound();
  }
  const {transactions, ...account} = accountData;

  return (
    <div className="space-y-8 px-5">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      {/* Chart Section */}
      
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <AccountChart/>
      </Suspense>
      {/* Transaction Table */}

      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <TransactionTable />
      </Suspense>

    </div>
  )
}

export default AccountsPage
