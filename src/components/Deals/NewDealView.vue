<template>
  <main class="flex justify-center mt-6 sm:mt-20 mb-20">
    <!-- Increased max-w-5xl for wider card -->
  <div class="w-full max-w-5xl rounded-2xl shadow-none sm:shadow-lg p-6 sm:p-8">
      <div v-if="errorMessage" class="mb-4 p-3 rounded bg-red-100 text-red-700 text-center font-semibold">
        {{ errorMessage }}
      </div>

      <!-- Form Header -->
      <h1 class="text-3xl font-bold text-center mb-8 text-blue-700">
        {{ $t('DealsPage.NewDeal') }}
      </h1>

      <!-- Mobile multi-step form -->
      <div class="sm:hidden">
        <!-- Step indicator -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex-1 flex items-center">
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold', currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600']">1</div>
            <div class="flex-1 h-1 mx-2" :class="currentStep > 1 ? 'bg-blue-600' : 'bg-gray-200'"></div>
          </div>
          <div class="flex-1 flex items-center">
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold', currentStep === 2 ? 'bg-blue-600 text-white' : (currentStep > 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600')]">2</div>
            <div class="flex-1 h-1 mx-2" :class="currentStep > 2 ? 'bg-blue-600' : 'bg-gray-200'"></div>
          </div>
          <div class="flex-1 flex items-center">
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold', currentStep === 3 ? 'bg-blue-600 text-white' : (currentStep > 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600')]">3</div>
            <div class="flex-1 h-1 mx-2" :class="currentStep > 3 ? 'bg-blue-600' : 'bg-gray-200'"></div>
          </div>
          <div>
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold', currentStep === 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600']">4</div>
          </div>
        </div>

        <!-- Step 1: Product -->
        <div v-if="currentStep === 1" class="w-full max-w-screen-md mx-auto">
          <div class="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
            <h2 class="text-xl font-semibold mb-2 text-blue-600">{{ $t('DealsPage.Product') }}</h2>
            <div>
              <label class="block text-base font-medium text-gray-700 mb-1">{{ $t('DealsPage.Brand') }}</label>
              <input v-model="product.brand" type="text" :placeholder="$t('DealsPage.Brand')" class="bg-gray-50 border w-full p-4 text-base rounded-lg focus:ring-2 focus:ring-blue-300"
                :class="invalidFields.brand ? 'border-red-500 focus:ring-red-300' : 'border-gray-300'" />
            </div>
            <div>
              <label class="block text-base font-medium text-gray-700 mb-1">{{ $t('DealsPage.Model') }}</label>
              <input v-model="product.model" type="text" :placeholder="$t('DealsPage.Model')" class="bg-gray-50 border w-full p-4 text-base rounded-lg focus:ring-2 focus:ring-blue-300"
                :class="invalidFields.model ? 'border-red-500 focus:ring-red-300' : 'border-gray-300'" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-base font-medium text-gray-700 mb-1">{{ $t('DealsPage.Year') }}</label>
                <input v-model="product.year" type="text" :placeholder="$t('DealsPage.Year')" class="bg-gray-50 border border-gray-300 w-full p-4 text-base rounded-lg focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label class="block text-base font-medium text-gray-700 mb-1">{{ $t('DealsPage.SerialNumber') }}</label>
                <input v-model="product.serialNumber" type="text" :placeholder="$t('DealsPage.SerialNumber')" class="bg-gray-50 border border-gray-300 w-full p-4 text-base rounded-lg focus:ring-2 focus:ring-blue-300" />
              </div>
            </div>
            <div>
              <label class="block text-base font-medium text-gray-700 mb-1">{{ $t('DealsPage.Price') }}</label>
              <input v-model.number="product.price" type="number" :placeholder="$t('DealsPage.Price')" 
              class="bg-gray-50 border w-full p-4 text-base rounded-lg focus:ring-2 focus:ring-blue-300"
              :class="invalidFields.price ? 'border-red-500 focus:ring-red-300' : 'border-gray-300'" />
            </div>
            <div>
              <label class="block text-base font-medium text-gray-700 mb-1">{{ $t('DealsPage.Description') }}</label>
              <textarea v-model="product.description" :placeholder="$t('DealsPage.Description')" 
              class="bg-gray-50 border border-gray-300 w-full p-4 text-base rounded-lg h-28 resize-y focus:ring-2 focus:ring-blue-300"></textarea>
            </div>
          </div>
          <div v-if="stepError" class="mt-3 p-3 rounded bg-red-50 text-red-700 text-sm">{{ stepError }}</div>
          <div class="mt-4 flex justify-end gap-2">
            <button class="px-6 py-3 rounded-lg bg-blue-600 text-white text-base" @click="nextStep">{{ $t('Common.Next') }}</button>
          </div>
        </div>

        <!-- Step 2: Payment + Results -->
        <div v-if="currentStep === 2" class="w-full max-w-screen-md mx-auto">
          <div class="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
            <h2 class="text-xl font-semibold text-blue-600">{{ $t('DealsPage.PaymentInformation') }}</h2>
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-base font-medium text-gray-700 mb-1">{{ $t('DealsPage.Downpayment') }}</label>
                <input v-model.number="payment.downpayment" type="number" min="0" :placeholder="$t('DealsPage.Downpayment')" class="bg-gray-50 border w-full p-4 text-base rounded-lg focus:ring-2 focus:ring-blue-300"
                  :class="invalidFields.downpayment ? 'border-red-500 focus:ring-red-300' : 'border-gray-300'" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-base font-medium text-gray-700 mb-1">{{ $t('DealsPage.PeriodMonth') }}</label>
                  <input v-model.number="payment.periodMonth" type="number" :placeholder="$t('DealsPage.PeriodMonth')" class="bg-gray-50 border w-full p-4 text-base rounded-lg focus:ring-2 focus:ring-blue-300"
                    :class="invalidFields.periodMonth ? 'border-red-500 focus:ring-red-300' : 'border-gray-300'" />
                </div>
                <div>
                  <label class="block text-base font-medium text-gray-700 mb-1">{{ $t('DealsPage.ProfitMargin') }}</label>
                  <input v-model.number="payment.profit_margin" type="number" min="0" :placeholder="$t('DealsPage.ProfitMargin')" class="bg-gray-50 border w-full p-4 text-base rounded-lg focus:ring-2 focus:ring-blue-300"
                    :class="invalidFields.profit_margin ? 'border-red-500 focus:ring-red-300' : 'border-gray-300'" />
                </div>
              </div>
              <div>
                <label class="block text-base font-medium text-gray-700 mb-1">{{ $t('DealsPage.PaymentDayOfMonth') }}</label>
                <input
                  v-model.number="payment.paymentDayOfMonth"
                  type="number"
                  min="1"
                  max="31"
                  :placeholder="$t('DealsPage.PaymentDayOfMonthPlaceholder')"
                  class="bg-gray-50 border w-full p-4 text-base rounded-lg focus:ring-2 focus:ring-blue-300"
                  :class="invalidFields.paymentDayOfMonth ? 'border-red-500 focus:ring-red-300' : 'border-gray-300'"
                />
                <p class="text-xs text-gray-500 mt-1">{{ $t('DealsPage.PaymentDayOfMonthHelper') }}</p>
              </div>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg px-5 py-4 mt-2">
              <h3 class="text-lg font-semibold mb-3 text-blue-600">{{ $t('DealsPage.InvestmentReturn') }}</h3>
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">{{ $t('Common.NasiyaPrice') }}</span>
                  <span class="text-xl font-semibold text-blue-700">{{ nasiyaPrice }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">{{ $t('DealsPage.Investment') }}</span>
                  <span class="text-xl font-semibold text-blue-700">{{ priceAfterDownPayment }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">{{ $t('DealsPage.TotalReturn') }}</span>
                  <span class="text-xl font-semibold text-blue-700">{{ priceAfterProfitMargin }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 flex items-center">
                    {{ $t('DealsPage.PaymentPerMonth') }}
                    <template v-if="!isEditingPayment">
                      <button @click="editPaymentPerMonth" class="ml-2 px-3 py-2 bg-blue-500 text-white rounded text-sm">
                        {{ $t('DealsPage.Edit') }}
                      </button>
                    </template>
                  </span>
                  <div class="flex items-center gap-2 justify-end w-1/2">
                    <template v-if="isEditingPayment">
                      <input v-model.number="editablePaymentPerMonth" type="number" class="p-2 border rounded w-28 text-base" :placeholder="$t('DealsPage.PaymentPerMonth')" />
                      <button @click="savePaymentPerMonth" class="px-3 py-2 bg-green-500 text-white rounded text-sm">{{ $t('DealsPage.Save') }}</button>
                      <button @click="cancelEditPayment" class="px-3 py-2 bg-gray-300 text-black rounded text-sm">{{ $t('DealsPage.Cancel') }}</button>
                    </template>
                    <template v-else>
                      <span class="text-xl font-semibold text-blue-700 w-28 text-right">{{ paymentPerMonth }}</span>
                    </template>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">{{ $t('DealsPage.Profit') }}</span>
                  <span class="text-xl font-semibold text-blue-700">{{ profit }}</span>
                </div>
              </div>
            </div>
            <div v-if="stepError" class="mt-3 p-3 rounded bg-red-50 text-red-700 text-sm">{{ stepError }}</div>
          </div>
          <div class="mt-4 flex justify-between gap-2">
            <button class="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 text-base" @click="prevStep">{{ $t('Common.Previous') }}</button>
            <button class="px-6 py-3 rounded-lg bg-blue-600 text-white text-base" @click="nextStep">{{ $t('Common.Next') }}</button>
          </div>
        </div>

        <!-- Step 3: Participants -->
        <div v-if="currentStep === 3" class="w-full max-w-screen-md mx-auto">
          <div class="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
            <h2 class="text-xl font-semibold mb-2 text-blue-600">{{ $t('DealsPage.Participants') }}</h2>
            <div class="space-y-6">
              <div>
                <label class="block text-base font-medium text-gray-700 mb-1">{{ $t('DealsPage.InvestorPhone') }}</label>
                <div class="flex gap-2 items-center">
                  <span class="px-3 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 select-none">+{{ defaultPhoneCode }}</span>
                  <input v-model.number="investorPhone" type="number" inputmode="numeric" :placeholder="$t('DealsPage.InvestorPhonePlaceholder')" class="bg-gray-50 border w-full p-4 text-base rounded-lg focus:ring-2 focus:ring-blue-300" :class="invalidFields.investorPhone ? 'border-red-500 focus:ring-red-300' : 'border-gray-300'" />
                  <button @click="addInvestorByPhone" type="button" class="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-base">{{ $t('Common.Add') }}</button>
                </div>
                <p v-if="investorLookupError" class="text-xs text-red-600 mt-1">{{ investorLookupError }}</p>
                <p v-if="investorUser" class="text-sm text-green-600 mt-1">{{ formatUser(investorUser) }}</p>
              </div>

              <div>
                <label class="block text-base font-medium text-gray-700 mb-1">{{ $t('DealsPage.BuyerPhone') }}</label>
                <div class="flex gap-2 items-center">
                  <span class="px-3 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 select-none">+{{ defaultPhoneCode }}</span>
                  <input v-model.number="buyerPhone" type="number" inputmode="numeric" :placeholder="$t('DealsPage.BuyerPhonePlaceholder')" class="bg-gray-50 border w-full p-4 text-base rounded-lg focus:ring-2 focus:ring-blue-300" :class="invalidFields.buyerPhone ? 'border-red-500 focus:ring-red-300' : 'border-gray-300'" />
                  <button @click="addBuyerByPhone" type="button" class="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-base">{{ $t('Common.Add') }}</button>
                </div>
                <p v-if="buyerLookupError" class="text-xs text-red-600 mt-1">{{ buyerLookupError }}</p>
                <p v-if="buyerUser" class="text-sm text-green-600 mt-1">{{ formatUser(buyerUser) }}</p>
              </div>
            </div>
          </div>
          <div class="mt-4 flex justify-between gap-2">
            <button class="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 text-base" @click="prevStep">{{ $t('Common.Previous') }}</button>
            <button class="px-6 py-3 rounded-lg bg-blue-600 text-white text-base" @click="nextStep">{{ $t('Common.Next') }}</button>
          </div>
        </div>

        <!-- Step 4: Summary -->
        <div v-if="currentStep === 4" class="w-full max-w-screen-md mx-auto">
          <div class="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
            <h2 class="text-xl font-semibold mb-2 text-blue-600">{{ $t('DealsPage.DealDetails') }}</h2>
            <div class="space-y-4">
              <div class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-semibold text-gray-700">{{ $t('DealsPage.Product') }}</h3>
                  <button class="text-blue-600 text-sm" @click="setStep(1)">{{ $t('DealsPage.Edit') }}</button>
                </div>
                <div class="text-sm text-gray-600">{{ product.brand }} {{ product.model }} • {{ product.year }}</div>
                <div class="text-sm text-gray-500">{{ $t('DealsPage.SerialNumber') }}: {{ product.serialNumber }}</div>
                <div class="text-sm text-gray-500">{{ $t('DealsPage.Price') }}: {{ product.price }}</div>
                <div class="text-sm text-gray-500 mt-1">{{ product.description }}</div>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-semibold text-gray-700">{{ $t('DealsPage.PaymentInformation') }}</h3>
                  <button class="text-blue-600 text-sm" @click="setStep(2)">{{ $t('DealsPage.Edit') }}</button>
                </div>
                <div class="text-sm text-gray-600">{{ $t('DealsPage.Downpayment') }}: {{ payment.downpayment }}</div>
                <div class="text-sm text-gray-600">{{ $t('DealsPage.PeriodMonth') }}: {{ payment.periodMonth }}</div>
                <div class="text-sm text-gray-600">{{ $t('DealsPage.ProfitMargin') }}: {{ payment.profit_margin }}%</div>
                <div v-if="payment.paymentDayOfMonth" class="text-sm text-gray-600">{{ $t('DealsPage.PaymentDayOfMonth') }}: {{ payment.paymentDayOfMonth }}</div>
                <div class="mt-2 text-sm text-gray-600">{{ $t('Common.NasiyaPrice') }}: {{ nasiyaPrice }}</div>
                <div class="text-sm text-gray-600">{{ $t('DealsPage.TotalReturn') }}: {{ priceAfterProfitMargin }}</div>
                <div class="text-sm text-gray-600">{{ $t('DealsPage.PaymentPerMonth') }}: {{ paymentPerMonth }}</div>
                <div class="text-sm text-gray-600">{{ $t('DealsPage.Profit') }}: {{ profit }}</div>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-semibold text-gray-700">{{ $t('DealsPage.Participants') }}</h3>
                  <button class="text-blue-600 text-sm" @click="setStep(3)">{{ $t('DealsPage.Edit') }}</button>
                </div>
                <div class="text-sm text-gray-600">{{ $t('DealsPage.Investor') }}: {{ investorUser ? formatUser(investorUser) : '-' }}</div>
                <div class="text-sm text-gray-600">{{ $t('DealsPage.Buyer') }}: {{ buyerUser ? formatUser(buyerUser) : '-' }}</div>
              </div>
            </div>
          </div>
          <div class="mt-4 flex justify-between gap-2">
            <button class="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 text-base" @click="prevStep">{{ $t('Common.Previous') }}</button>
            <button class="px-6 py-3 rounded-lg bg-green-600 text-white text-base" @click="createDeal">{{ $t('DealsPage.CreateNewDeal') }}</button>
          </div>
        </div>
      </div>

      <!-- Desktop form (unchanged) -->
      <div class="hidden sm:block">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Product Section -->
        <div>
          <h2 class="text-lg font-semibold mb-4 text-blue-600">{{ $t('DealsPage.Product') }}</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.Brand') }}</label>
              <input v-model="product.brand" type="text" :placeholder="$t('DealsPage.Brand')" class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.Model') }}</label>
              <input v-model="product.model" type="text" :placeholder="$t('DealsPage.Model')" class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.Year') }}</label>
              <input v-model="product.year" type="text" :placeholder="$t('DealsPage.Year')" class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.SerialNumber') }}</label>
              <input v-model="product.serialNumber" type="text" :placeholder="$t('DealsPage.SerialNumber')" class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.Price') }}</label>
              <input v-model.number="product.price" type="numbers" :placeholder="$t('DealsPage.Price')" 
              class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.Description') }}</label>
              <textarea v-model="product.description" :placeholder="$t('DealsPage.Description')" 
              class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg h-20 resize-none focus:ring-2 focus:ring-blue-300"></textarea>
            </div>
          </div>
        </div>

        <!-- Payment Section -->
        <div>
          <h2 class="text-lg font-semibold mb-4 text-blue-600">{{ $t('DealsPage.PaymentInformation') }}</h2>
          <div class="space-y-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.Downpayment') }}</label>
              <input v-model.number="payment.downpayment" type="numbers" :placeholder="$t('DealsPage.Downpayment')" class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.PeriodMonth') }}</label>
              <input v-model.number="payment.periodMonth" type="numbers" :placeholder="$t('DealsPage.PeriodMonth')" class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.ProfitMargin') }}</label>
              <input v-model.number="payment.profit_margin" type="numbers" :placeholder="$t('DealsPage.ProfitMargin')" class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.PaymentDayOfMonth') }}</label>
              <input
                v-model.number="payment.paymentDayOfMonth"
                type="numbers"
                min="1"
                max="31"
                :placeholder="$t('DealsPage.PaymentDayOfMonthPlaceholder')"
                class="bg-gray-50 border w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
                :class="invalidFields.paymentDayOfMonth ? 'border-red-500 focus:ring-red-300' : 'border-gray-300'"
              />
              <p class="text-xs text-gray-500 mt-1">{{ $t('DealsPage.PaymentDayOfMonthHelper') }}</p>
            </div>
          </div>

          <!-- Results Area: add mt-16 for extra top margin -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg px-6 py-4">
            <h2 class="text-lg font-semibold mb-4 text-blue-600">{{ $t('DealsPage.InvestmentReturn') }}</h2>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">{{ $t('Common.NasiyaPrice') }}</span>
                <span class="text-xl font-semibold text-blue-700">{{ nasiyaPrice }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">{{ $t('DealsPage.Investment') }}</span>
                <span class="text-xl font-semibold text-blue-700">{{ priceAfterDownPayment }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">{{ $t('DealsPage.TotalReturn') }}</span>
                <span class="text-xl font-semibold text-blue-700">{{ priceAfterProfitMargin }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 flex items-center">
                  {{ $t('DealsPage.PaymentPerMonth') }}
                  <template v-if="!isEditingPayment">
                    <!-- Edit button right next to the label -->
                    <button @click="editPaymentPerMonth" class="ml-2 px-2 py-1 bg-blue-500 text-white rounded">
                      {{ $t('DealsPage.Edit') }}
                    </button>
                  </template>
                </span>
                <div class="flex items-center gap-2 justify-end w-1/2">
                  <template v-if="isEditingPayment">
                    <input v-model.number="editablePaymentPerMonth" type="numbers" class="p-1 border rounded w-24" :placeholder="$t('DealsPage.PaymentPerMonth')" />
                    <button @click="savePaymentPerMonth" class="px-2 py-1 bg-green-500 text-white rounded">{{ $t('DealsPage.Save') }}</button>
                    <button @click="cancelEditPayment" class="px-2 py-1 bg-gray-300 text-black rounded">{{ $t('DealsPage.Cancel') }}</button>
                  </template>
                  <template v-else>
                    <span class="text-xl font-semibold text-blue-700 w-24 text-right">{{ paymentPerMonth }}</span>
                  </template>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">{{ $t('DealsPage.Profit') }}</span>
                <span class="text-xl font-semibold text-blue-700">{{ profit }}</span>
              </div>
            </div>
          </div>
        </div>
        </div>

        <!-- Participant section -->
        <div class="mb-8">
        <h2 class="text-lg font-semibold mb-2 text-blue-600">{{ $t('DealsPage.Participants') }}</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          <!-- Investor phone field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.InvestorPhone') }}</label>
            <div class="flex gap-2 items-center">
              <span class="px-3 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 select-none">+{{ defaultPhoneCode }}</span>
              <input v-model.number="investorPhone" type="numbers" inputmode="numeric" :placeholder="$t('DealsPage.InvestorPhonePlaceholder')" class="bg-gray-50 border w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" :class="invalidFields.investorPhone ? 'border-red-500 focus:ring-red-300' : 'border-gray-300'" />
              <button @click="addInvestorByPhone" type="button" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{{ $t('Common.Add') }}</button>
            </div>
            <p v-if="investorLookupError" class="text-xs text-red-600 mt-1">{{ investorLookupError }}</p>
            <p v-if="investorUser" class="text-sm text-green-600 mt-1">{{ formatUser(investorUser) }}</p>
          </div>

          <!-- Buyer phone field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.BuyerPhone') }}</label>
            <div class="flex gap-2 items-center">
              <span class="px-3 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 select-none">+{{ defaultPhoneCode }}</span>
              <input v-model.number="buyerPhone" type="numbers" inputmode="numeric" :placeholder="$t('DealsPage.BuyerPhonePlaceholder')" class="bg-gray-50 border w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" :class="invalidFields.buyerPhone ? 'border-red-500 focus:ring-red-300' : 'border-gray-300'" />
              <button @click="addBuyerByPhone" type="button" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{{ $t('Common.Add') }}</button>
            </div>
            <p v-if="buyerLookupError" class="text-xs text-red-600 mt-1">{{ buyerLookupError }}</p>
            <p v-if="buyerUser" class="text-sm text-green-600 mt-1">{{ formatUser(buyerUser) }}</p>
          </div>
        </div>
        </div>

        <!-- Create Deal Button -->
        <div class="flex justify-center mt-8">
          <button
            @click="createDeal"
            class="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 text-lg transition"
          >
            {{ $t('DealsPage.CreateNewDeal') }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NewDealView',
  components: {
  },
  data() {
    return {
      currentStep: 1,
      stepError: '',
      invalidFields: {
        brand: false,
        model: false,
        price: false,
        downpayment: false,
        periodMonth: false,
        profit_margin: false,
        paymentDayOfMonth: false,
        investorPhone: false,
        buyerPhone: false,
      },
      product: {
        brand: '',
        model: '',
        description: '',
        year: '',
        serialNumber: '',
        price: 0
      },
      payment: {
        downpayment: null,
        periodMonth: 0,
        profit_margin: null,
        paymentDayOfMonth: null
      },
      investorPhone: '',
      buyerPhone: '',
      investorUser: null,
      buyerUser: null,
      defaultPhoneCode: '998',
      investorLookupError: '',
      buyerLookupError: '',
      isEditingPayment: false,
      editablePaymentPerMonth: 0,
      manualPaymentPerMonth: null,
      manualPriceAfterProfitMargin: null,
      manualProfit: null,
      errorMessage: ''
    }
  },
  computed: {
    priceAfterDownPayment() {
      return Math.max(this.product.price - this.payment.downpayment, 0);
    },
    priceAfterProfitMargin() {
      if (this.manualPriceAfterProfitMargin !== null) {
        return this.manualPriceAfterProfitMargin;
      }
      const margin = this.priceAfterDownPayment * (this.payment.profit_margin / 100);
      return Math.round(this.priceAfterDownPayment + margin);
    },
    paymentPerMonth() {
      if (this.manualPaymentPerMonth !== null) {
        return this.manualPaymentPerMonth;
      }
      if (this.payment.periodMonth > 0) {
        return Math.round(this.priceAfterProfitMargin / this.payment.periodMonth);
      }
      return 0;
    },
    profit() {
      if (this.manualProfit !== null) {
        return this.manualProfit;
      }
      return Math.round(this.priceAfterProfitMargin - this.priceAfterDownPayment);
    },
    nasiyaPrice() {
      // total return + downpayment
      return Math.round(this.priceAfterProfitMargin + this.payment.downpayment);
    }
  },
  mounted() {
    // Restore step from query
    const qs = Number(this.$route.query.step);
    if (qs && [1,2,3,4].includes(qs)) {
      this.currentStep = qs;
    }
  },
  methods: {
    setStep(step) {
      this.currentStep = step;
      this.stepError = '';
      this.$router.replace({ query: { ...this.$route.query, step: String(step) } });
    },
    nextStep() {
      this.stepError = '';
      // Validate current step
      if (this.currentStep === 1) {
        this.invalidFields.brand = !this.product.brand?.toString().trim();
        this.invalidFields.model = !this.product.model?.toString().trim();
        this.invalidFields.price = !(Number(this.product.price) > 0);
        if (this.invalidFields.brand || this.invalidFields.model || this.invalidFields.price) {
          this.stepError = this.$t('Common.RequiredFields') || 'Please fill required fields.';
          return;
        }
      }
      if (this.currentStep === 2) {
        this.invalidFields.downpayment = (this.payment.downpayment === null) || Number.isNaN(Number(this.payment.downpayment)) || (Number(this.payment.downpayment) < 0);
        this.invalidFields.periodMonth = !(Number(this.payment.periodMonth) > 0);
        this.invalidFields.profit_margin = (this.payment.profit_margin === null) || Number.isNaN(Number(this.payment.profit_margin)) || (Number(this.payment.profit_margin) < 0);
        this.invalidFields.paymentDayOfMonth = !(Number(this.payment.paymentDayOfMonth) >= 1 && Number(this.payment.paymentDayOfMonth) <= 31);
        if (this.invalidFields.periodMonth || this.invalidFields.profit_margin || this.invalidFields.downpayment || this.invalidFields.paymentDayOfMonth) {
          this.stepError = this.$t('Common.RequiredFields') || 'Please fill required fields.';
          return;
        }
      }
      if (this.currentStep === 3) {
        this.invalidFields.investorPhone = !(String(this.investorPhone).trim().length > 0);
        this.invalidFields.buyerPhone = !(String(this.buyerPhone).trim().length > 0);
        if (this.invalidFields.investorPhone || this.invalidFields.buyerPhone) {
          this.stepError = this.$t('Common.RequiredFields') || 'Please fill required fields.';
          return;
        }
      }
      if (this.currentStep < 4) {
        this.setStep(this.currentStep + 1);
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.setStep(this.currentStep - 1);
      }
    },
    editPaymentPerMonth() {
      this.isEditingPayment = true;
      this.editablePaymentPerMonth = this.paymentPerMonth;
    },
    savePaymentPerMonth() {
      this.isEditingPayment = false;
      if (this.editablePaymentPerMonth > 0) {
        this.manualPaymentPerMonth = this.editablePaymentPerMonth;
        this.manualPriceAfterProfitMargin = this.editablePaymentPerMonth * this.payment.periodMonth;
        this.manualProfit = this.manualPriceAfterProfitMargin - this.priceAfterDownPayment;
      }
    },
    cancelEditPayment() {
      this.isEditingPayment = false;
      this.editablePaymentPerMonth = this.paymentPerMonth;
      this.manualPaymentPerMonth = null;
      this.manualPriceAfterProfitMargin = null;
      this.manualProfit = null;
    },
    formatUser(user) {
      if (!user) return '';
      const first = user.firstName || user.firstname || '';
      const last = user.lastName || user.lastname || '';
      const phone = user.phone || user.phoneNumber || '';
      const name = `${first} ${last}`.trim();
      return [name || undefined, phone || undefined].filter(Boolean).join(' • ');
    },
    async addInvestorByPhone() {
      if (!this.investorPhone) {
        this.investorLookupError = this.$t('DealsPage.PhoneRequired');
        return;
      }
      this.investorLookupError = '';
      const user = await this.lookupUserByPhone(this.investorPhone, 'Investor');
      if (user) {
        this.investorUser = user;
        this.investorLookupError = '';
      } else {
        this.investorUser = null;
        this.investorLookupError = this.$t('DealsPage.UserNotFound');
      }
    },
    async addBuyerByPhone() {
      if (!this.buyerPhone) {
        this.buyerLookupError = this.$t('DealsPage.PhoneRequired');
        return;
      }
      this.buyerLookupError = '';
      const user = await this.lookupUserByPhone(this.buyerPhone, 'Buyer');
      if (user) {
        this.buyerUser = user;
        this.buyerLookupError = '';
      } else {
        this.buyerUser = null;
        this.buyerLookupError = this.$t('DealsPage.UserNotFound');
      }
    },
    async lookupUserByPhone(phone, role) {
      const token = localStorage.getItem('token');
      try {
        const fullPhone = `${this.defaultPhoneCode}${String(phone)}`;
        const encodedPhone = encodeURIComponent(fullPhone);
        const base = role === 'Investor' ? '/api/Investor/by-phone' : '/api/Buyer/by-phone';
        const url = `${base}/${encodedPhone}`;
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return response.data || null;
      } catch (e) {
        return null;
      }
    },
    async createDeal() {
      const token = localStorage.getItem('token');

      // Validate paymentDayOfMonth if provided
      if (this.payment.paymentDayOfMonth !== null) {
        const day = Number(this.payment.paymentDayOfMonth);
        if (!(day >= 1 && day <= 31)) {
          this.errorMessage = this.$t('DealsPage.PaymentDayOfMonthInvalid');
          return;
        }
      }

      const requestBody = {
        investorId: (this.investorUser && this.investorUser.id) || 0,
        buyerId: (this.buyerUser && this.buyerUser.id) || 0,
        brand: this.product.brand,
        model: this.product.model,
        year: this.product.year,
        serialNumber: this.product.serialNumber,
        description: this.product.description,
        price: this.product.price,
        downpayment: this.payment.downpayment,
        periodMonth: this.payment.periodMonth,
        totalPayment: this.priceAfterProfitMargin,
        paymentDayOfMonth: this.payment.paymentDayOfMonth
      };

      this.errorMessage = '';
      try {
        const response = await axios.post('/api/Deal', requestBody, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 201 || response.status === 200) {
          this.$router.push({
            name: 'currentDeals',
            query: { message: this.$t('DealsPage.DealCreated') }
          });
        } else {
          this.errorMessage = this.$t('DealsPage.DealCreateFailed');
        }
      } catch (error) {
        this.errorMessage = this.$t('DealsPage.DealCreateFailed');
      }
    }
  }
}
</script>